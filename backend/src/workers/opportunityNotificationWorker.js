const OpportunityNotification = require("../models/OpportunityNotification");

const {
  sendOpportunityNotificationEmail,
} = require("../services/emailService");

// =====================================================
// CONFIGURATION
// =====================================================

const BATCH_SIZE = 10;

// Maximum number of attempts for one notification.
const MAX_ATTEMPTS = 3;

// Wait between individual emails.
const EMAIL_DELAY = 1000;

// Maximum time allowed for one email attempt.
const EMAIL_TIMEOUT = 30 * 1000;

// How often the worker checks for pending notifications.
const POLL_INTERVAL = 30 * 1000;

// How often stale "processing" notifications are cleaned up.
const CLEANUP_INTERVAL = 10 * 60 * 1000;

// Notifications stuck in "processing" longer than this
// are considered abandoned.
const PROCESSING_TIMEOUT = 10 * 60 * 1000;


// =====================================================
// WORKER STATE
// =====================================================

// Prevent multiple worker runs from overlapping.
let workerRunning = false;


// =====================================================
// HELPERS
// =====================================================

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


// =====================================================
// EMAIL WITH TIMEOUT
// =====================================================

const sendEmailWithTimeout = async ({
  firstName,
  email,
}) => {
  return Promise.race([
    sendOpportunityNotificationEmail({
      firstName,
      email,
    }),

    new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `Email sending timed out after ${
              EMAIL_TIMEOUT / 1000
            } seconds.`
          )
        );
      }, EMAIL_TIMEOUT);
    }),
  ]);
};


// =====================================================
// RESET STALE PROCESSING JOBS
// =====================================================

const resetStaleNotifications = async () => {
  try {
    const cutoff = new Date(
      Date.now() - PROCESSING_TIMEOUT
    );

    const result =
      await OpportunityNotification.updateMany(
        {
          status: "processing",
          lastAttemptAt: {
            $lt: cutoff,
          },
        },
        {
          $set: {
            status: "pending",
          },
        }
      );

    if (result.modifiedCount > 0) {
      console.log(
        `🔄 Reset ${result.modifiedCount} stale notification(s).`
      );
    }

  } catch (error) {
    console.error(
      "❌ Failed to reset stale notifications:",
      error.message
    );
  }
};


// =====================================================
// CLAIM ONE NOTIFICATION
// =====================================================

const claimNotification = async () => {
  return OpportunityNotification.findOneAndUpdate(
    {
      status: "pending",
      attempts: {
        $lt: MAX_ATTEMPTS,
      },
    },
    {
      $set: {
        status: "processing",
        lastAttemptAt: new Date(),
      },
      $inc: {
        attempts: 1,
      },
    },
    {
      returnDocument: "after",
      sort: {
        createdAt: 1,
      },
    }
  );
};


// =====================================================
// PROCESS ONE NOTIFICATION
// =====================================================

const processNotification = async (notification) => {
  try {
    await sendEmailWithTimeout({
      firstName: notification.firstName,
      email: notification.email,
    });

    await OpportunityNotification.findByIdAndUpdate(
      notification._id,
      {
        $set: {
          status: "sent",
          sentAt: new Date(),
          lastError: null,
        },
      }
    );

    console.log(
      `✅ Opportunity notification sent to ${notification.email}`
    );

  } catch (error) {
    console.error(
      `❌ Failed to send notification to ${notification.email}:`,
      error.message
    );

    const shouldRetry =
      notification.attempts < MAX_ATTEMPTS;

    await OpportunityNotification.findByIdAndUpdate(
      notification._id,
      {
        $set: {
          status: shouldRetry
            ? "pending"
            : "failed",
          lastError: error.message,
        },
      }
    );

    if (!shouldRetry) {
      console.error(
        `🚫 Notification permanently failed for ${notification.email} after ${MAX_ATTEMPTS} attempts.`
      );
    }
  }
};


// =====================================================
// PROCESS ONE BATCH
// =====================================================

const processNotificationBatch = async () => {
  let processed = 0;

  for (let i = 0; i < BATCH_SIZE; i++) {
    const notification =
      await claimNotification();

    if (!notification) {
      break;
    }

    await processNotification(notification);

    processed++;

    await delay(EMAIL_DELAY);
  }

  if (processed > 0) {
    console.log(
      `📧 Notification worker processed ${processed} job(s).`
    );
  }
};


// =====================================================
// WORKER RUN
// =====================================================

const runWorker = async () => {
  // Prevent overlapping worker executions.
  if (workerRunning) {
    console.log(
      "⏳ Notification worker is still processing the previous batch."
    );

    return;
  }

  workerRunning = true;

  try {
    await processNotificationBatch();

  } catch (error) {
    console.error(
      "❌ Notification worker error:",
      error.message
    );

  } finally {
    workerRunning = false;
  }
};


// =====================================================
// START WORKER
// =====================================================

const startOpportunityNotificationWorker =
  async () => {
    console.log(
      "📧 Opportunity notification worker started."
    );

    // Clean stale jobs once when the server starts.
    await resetStaleNotifications();

    // Process pending jobs immediately.
    await runWorker();

    // Process pending jobs periodically.
    setInterval(
      runWorker,
      POLL_INTERVAL
    );

    // Clean stale jobs separately.
    setInterval(
      resetStaleNotifications,
      CLEANUP_INTERVAL
    );
  };


module.exports = {
  startOpportunityNotificationWorker,
};
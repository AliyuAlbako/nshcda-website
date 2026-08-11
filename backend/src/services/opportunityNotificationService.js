// const OpportunityNotification = require("../models/OpportunityNotification");
// const EmploymentProfile = require("../models/EmploymentProfile");

// /**
//  * Create notification jobs for all active employment profiles.
//  *
//  * This function DOES NOT send emails.
//  * It only creates persistent notification records
//  * that the background worker will process.
//  */
// const queueOpportunityNotifications = async (opportunityId) => {
//   try {
//     // Get all active employment profiles with valid emails
//     const profiles = await EmploymentProfile.find({
//       status: "Active",
//       email: {
//         $exists: true,
//         $ne: "",
//       },
//     }).select("_id firstName email");

//     if (profiles.length === 0) {
//       console.log(
//         "📧 No active employment profiles available for notification."
//       );

//       return {
//         queued: 0,
//         skipped: 0,
//       };
//     }

//     // Create notification jobs
//     const notifications = profiles.map((profile) => ({
//       opportunity: opportunityId,
//       profile: profile._id,
//       email: profile.email,
//       firstName: profile.firstName,
//       status: "pending",
//       attempts: 0,
//     }));

//     let queued = 0;
//     let skipped = 0;

//     try {
//       // ordered: false allows MongoDB to continue inserting
//       // even if some records already exist.
//       const result =
//         await OpportunityNotification.insertMany(
//           notifications,
//           {
//             ordered: false,
//           }
//         );

//       queued = result.length;
//     } catch (error) {
//       // Duplicate-key errors are expected if the same
//       // opportunity is queued more than once.
//       if (error.code === 11000 || error.writeErrors) {
//         const insertedCount =
//           error.insertedDocs?.length ||
//           0;

//         queued = insertedCount;

//         skipped =
//           notifications.length - insertedCount;

//         console.log(
//           `📧 Notification queue: ${queued} created, ${skipped} already existed.`
//         );
//       } else {
//         throw error;
//       }
//     }

//     console.log(
//       `📧 Opportunity notifications queued: ${queued}`
//     );

//     return {
//       queued,
//       skipped,
//     };

//   } catch (error) {
//     console.error(
//       "❌ Failed to queue opportunity notifications:",
//       error.message
//     );

//     throw error;
//   }
// };

// module.exports = {
//   queueOpportunityNotifications,
// };

const OpportunityNotification = require("../models/OpportunityNotification");
const EmploymentProfile = require("../models/EmploymentProfile");

/**
 * Create notification jobs for active employment profiles.
 *
 * In test mode, only the configured test email receives
 * a notification.
 *
 * In production mode, all active profiles receive
 * notification jobs.
 */
const queueOpportunityNotifications = async (
  opportunityId
) => {
  try {
    const testEmail =
      process.env.OPPORTUNITY_NOTIFICATION_TEST_EMAIL;

    const isTestMode = Boolean(testEmail);

    let profiles;

    // ============================================
    // TEST MODE
    // ============================================

    if (isTestMode) {
      console.log(
        `🧪 Opportunity notification TEST MODE enabled for ${testEmail}`
      );

      const testProfile =
        await EmploymentProfile.findOne({
          email: testEmail.toLowerCase().trim(),
          status: "Active",
        }).select("_id firstName email");

      if (!testProfile) {
        throw new Error(
          `Test email ${testEmail} does not belong to an active employment profile.`
        );
      }

      profiles = [testProfile];

    } else {

      // ============================================
      // PRODUCTION MODE
      // ============================================

      profiles = await EmploymentProfile.find({
        status: "Active",
        email: {
          $exists: true,
          $ne: "",
        },
      }).select("_id firstName email");
    }

    if (profiles.length === 0) {
      console.log(
        "📧 No eligible employment profiles found for notification."
      );

      return {
        queued: 0,
        skipped: 0,
      };
    }

    // ============================================
    // CREATE NOTIFICATION JOBS
    // ============================================

    const notifications = profiles.map((profile) => ({
      opportunity: opportunityId,
      profile: profile._id,
      email: profile.email,
      firstName: profile.firstName,
      status: "pending",
      attempts: 0,
    }));

    let queued = 0;
    let skipped = 0;

    try {
      const result =
        await OpportunityNotification.insertMany(
          notifications,
          {
            ordered: false,
          }
        );

      queued = result.length;

    } catch (error) {

      // Duplicate notification records are safely ignored.
      if (
        error.code === 11000 ||
        error.writeErrors
      ) {
        const insertedCount =
          error.insertedDocs?.length || 0;

        queued = insertedCount;

        skipped =
          notifications.length - insertedCount;

        console.log(
          `📧 Notification queue: ${queued} created, ${skipped} already existed.`
        );

      } else {
        throw error;
      }
    }

    console.log(
      `📧 Opportunity notifications queued: ${queued}`
    );

    return {
      queued,
      skipped,
    };

  } catch (error) {

    console.error(
      "❌ Failed to queue opportunity notifications:",
      error.message
    );

    throw error;
  }
};

module.exports = {
  queueOpportunityNotifications,
};
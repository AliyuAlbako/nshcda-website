require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const {
  startOpportunityNotificationWorker,
} = require("./workers/opportunityNotificationWorker");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // ============================================
    // Connect to MongoDB
    // ============================================

    await connectDB();

    // ============================================
    // Start Express server
    // ============================================

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // ============================================
    // Start Opportunity Notification Worker
    // ============================================

    startOpportunityNotificationWorker().catch(
      (error) => {
        console.error(
          "❌ Opportunity notification worker failed:",
          error.message
        );
      }
    );

  } catch (error) {
    console.error(
      "❌ Failed to start server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
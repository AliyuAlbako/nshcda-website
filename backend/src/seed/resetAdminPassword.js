const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const Admin = require("../models/Admin");

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = await Admin.findOne({
      email: "nshcdaadmin@gmail.com",
    });

    if (!admin) {
      console.log("Admin not found");
      process.exit();
    }

    admin.password = "Superadmin2026#";

    // This will trigger the pre("save") hook and hash the password
    await admin.save();

    console.log("✅ Password reset successfully");
    console.log("Email:", admin.email);
    console.log("Password: Superadmin2026#");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

resetPassword();
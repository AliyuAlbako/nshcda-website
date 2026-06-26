const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("../models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({
      email: "nshcdaadmin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    await Admin.create({
      name: "NSHCDA Super Admin",
      email: "nshcdaadmin@gmail.com",
      password: "Superadmin2026#",
      role: "super_admin",
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

createAdmin();
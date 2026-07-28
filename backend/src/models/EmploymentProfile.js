const mongoose = require("mongoose");

const employmentProfileSchema = new mongoose.Schema(
    {
        // ================= PERSONAL INFORMATION =================
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        gender: {
            type: String,
            required: true,
        },

        dateOfBirth: {
            type: Date,
            required: true,
        },

        lga: {
            type: String,
            required: true,
        },

        // ================= CONTACT INFORMATION =================
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        // ================= EDUCATION =================
        qualification: {
            type: String,
            required: true,
        },

        fieldOfStudy: {
            type: String,
            required: true,
        },

        institution: {
            type: String,
            required: true,
        },

        graduationYear: {
            type: Number,
            required: true,
        },

        grade: {
            type: String,
        },

        nyscStatus: {
            type: String,
        },

        // ================= EMPLOYMENT =================
        employmentStatus: {
            type: String,
            required: true,
        },

        experience: {
            type: String,
        },

        employmentType: {
            type: String,
        },

        sector: {
            type: String,
        },

        preferredLocation: {
            type: String,
        },

        // ================= SKILLS =================
        primarySkill: {
            type: String,
            required: true,
        },

        languages: {
            type: String,
        },

        professionalSkills: {
            type: String,
        },

        certifications: {
            type: String,
        },

        careerInterests: {
            type: String,
        },

        // ================= CV =================
        cv: {
            url: {
                type: String,
            },

            publicId: {
                type: String,
            },

            originalName: {
                type: String,
            },

            fileSize: {
                type: Number,
            },

            fileType: {
                type: String,
            },
        },

        // ================= REGISTRATION STATUS =================
        status: {
            type: String,
            enum: ["Active", "Archived"],
            default: "Active",
        },

        // ================= EMAIL =================
        emailSent: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// ================= INDEXES =================


// Faster admin searches
employmentProfileSchema.index({ lga: 1 });
employmentProfileSchema.index({ primarySkill: 1 });
employmentProfileSchema.index({ sector: 1 });
employmentProfileSchema.index({ employmentStatus: 1 });
employmentProfileSchema.index({ status: 1 });

module.exports = mongoose.model(
    "EmploymentProfile",
    employmentProfileSchema
);
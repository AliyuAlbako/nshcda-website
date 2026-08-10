const EmploymentProfile = require("../models/EmploymentProfile");
const { sendRegistrationEmail } = require("../services/emailService");
const { uploadCV, deleteCV} = require("../services/cloudinaryService");

/**
 * @desc    Create Employment Profile
 * @route   POST /api/employment-profiles
 * @access  Public
 */
const createEmploymentProfile = async (req, res) => {

    try {
    


        if (req.body.primarySkill === "Other") {
            req.body.primarySkill = req.body.otherPrimarySkill;
        }

        delete req.body.otherPrimarySkill;

        const existingProfile = await EmploymentProfile.findOne({
            email: req.body.email,
        });


        if (existingProfile) {

            return res.status(409).json({
                success: false,
                message:
                    "An employment profile with this email already exists.",
            });
        }

        // ================= CLOUDINARY =================
        let uploadedCV = null;

        if (req.file) {
           

           const applicantName = `${req.body.firstName} ${req.body.lastName}`;

            uploadedCV = await uploadCV(req.file, applicantName);
            
          
        } else {
            console.log("3️⃣ Cloudinary Upload: No CV uploaded");
        }

        // ================= SAVE PROFILE =================

        const profile = await EmploymentProfile.create({
            ...req.body,
            cv: uploadedCV,
        });
            

        // ================= EMAIL =================


        // ============================================
// Respond to the user immediately
// ============================================

res.status(201).json({
    success: true,
    message: "Employment profile created successfully.",
    data: profile,
});

// ============================================
// Send confirmation email in the background
// ============================================

(async () => {
    try {

        await sendRegistrationEmail({
            firstName: profile.firstName,
            email: profile.email,
        });

        await EmploymentProfile.findByIdAndUpdate(
            profile._id,
            {
                emailSent: true,
            }
        )

    

    } catch (emailError) {

        console.error(
            "❌ Email Error:",
            emailError.message
        );

    }
})();

    } catch (error) {



        
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Get All Employment Profiles
 * @route   GET /api/employment-profiles
 * @access  Private (Later)
 */
const getEmploymentProfiles = async (req, res) => {
    try {

        const profiles = await EmploymentProfile.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: profiles.length,
            data: profiles,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

/**
 * @desc    Get Single Employment Profile
 * @route   GET /api/employment-profiles/:id
 * @access  Private (Later)
 */
const getEmploymentProfile = async (req, res) => {
    try {

        const profile = await EmploymentProfile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Employment profile not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: profile,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

/**
 * @desc    Update Employment Profile
 * @route   PUT /api/employment-profiles/:id
 * @access  Private (Later)
 */
/**
 * @desc    Update Employment Profile
 * @route   PUT /api/employment-profiles/:id
 * @access  Private (Later)
 */
const updateEmploymentProfile = async (req, res) => {
    try {

        if (req.body.primarySkill === "Other") {
            req.body.primarySkill = req.body.otherPrimarySkill;
        }

        delete req.body.otherPrimarySkill;

        const profile = await EmploymentProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Employment profile not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employment profile updated successfully.",
            data: profile,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

/**
 * @desc    Delete Employment Profile
 * @route   DELETE /api/employment-profiles/:id
 * @access  Private (Later)
 */


/**
 * @desc    Get profile counts
 * @route   GET /api/employment-profiles/stats/count
 * @access  Private 
 */



const getEmploymentProfileCount = async (req, res) => {
  try {
    const totalProfiles = await EmploymentProfile.countDocuments();

    res.status(200).json({
      success: true,
      totalProfiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEmploymentProfile = async (req, res) => {
    try {

        const profile = await EmploymentProfile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Employment profile not found.",
            });
        }

        // ================= DELETE CV FROM CLOUDINARY =================

        if (profile.cv?.publicId) {

            try {

                await deleteCV(profile.cv.publicId);

            } catch (cloudinaryError) {

                console.error(
                    "Cloudinary CV deletion failed:",
                    cloudinaryError.message
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Profile could not be deleted because the CV could not be removed from storage.",
                });
            }
        }

        // ================= DELETE PROFILE FROM MONGODB =================

        await profile.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Employment profile deleted successfully.",
        });

    } catch (error) {

        console.error("Delete Employment Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createEmploymentProfile,
    getEmploymentProfiles,
    getEmploymentProfile,
    updateEmploymentProfile,
    deleteEmploymentProfile,
    getEmploymentProfileCount,
};
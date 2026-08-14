const nodemailer = require("nodemailer");
const axios = require("axios");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ Email service not ready:", error.message);
  } else {
    console.log("✅ Email service connected.");
  }
});

// =====================================================
// EMPLOYMENT PROFILE REGISTRATION EMAIL
// =====================================================

const sendRegistrationEmail = async ({ firstName, email }) => {
  const mailOptions = {
    from: `"NSHCDA Opportunities Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Employment Profile Registration Received",

    text: `Dear ${firstName},

Thank you for successfully registering your Employment Profile on the Nasarawa State Human Capital Development Agency (NSHCDA) Opportunities Portal.

Your employment profile has been received and securely stored in our database.

Please note that registration does not guarantee employment. Your profile will be considered whenever opportunities matching your qualifications, skills, and experience become available.

If you are shortlisted for an opportunity, we will contact you using the email address or phone number you provided during registration.

Thank you for your interest in contributing to the development of Nasarawa State.

Best regards,

NSHCDA Opportunities Portal
Nasarawa State Human Capital Development Agency
`,
  };

  return transporter.sendMail(mailOptions);
};

// =====================================================
// NEW OPPORTUNITY NOTIFICATION EMAIL
// =====================================================

const sendOpportunityNotificationEmail = async ({
  firstName,
  email,
}) => {
  const opportunitiesUrl =
    process.env.FRONTEND_URL ||
    "https://nshcda.com.ng";

  const mailOptions = {
    from: `"NSHCDA Opportunities Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "New Opportunities Are Waiting for You",

    text: `Hello ${firstName},

New opportunities have been added to the NSHCDA Opportunities Portal.

If you're currently looking for employment, training, scholarships, internships, grants, or other opportunities, now is a good time to check the portal.

You may find an opportunity that is right for you.

Don't miss out — new opportunities are added regularly.

Explore Available Opportunities:
${opportunitiesUrl}/opportunities

Visit the NSHCDA Opportunities Portal to see what's currently available and review the official application details for each opportunity.

You registered your employment profile with the NSHCDA Opportunities Portal, so we'll keep you informed when new opportunities become available.

Best regards,

NSHCDA Opportunities Portal
Nasarawa State Human Capital Development Agency
`,
  };

  return transporter.sendMail(mailOptions);
};


// =====================================================
// SEND CANDIDATE CV TO EMPLOYER
// =====================================================

const sendCVToEmployer = async ({
  candidateName,
  employerName,
  employerEmail,
  cvUrl,
}) => {
  try {
    if (!cvUrl) {
      throw new Error(
        "Candidate CV is not available."
      );
    }

    // Download CV from Cloudinary
    const cvResponse = await axios.get(cvUrl, {
      responseType: "arraybuffer",
      timeout: 30000,
    });

    const cvBuffer = Buffer.from(
      cvResponse.data
    );

    const mailOptions = {
      from: `"NSHCDA Opportunities Portal" <${process.env.EMAIL_USER}>`,
      to: employerEmail,

      subject: `Requested CV – ${candidateName}`,

      text: `Dear ${employerName},

Thank you for your interest in a candidate registered on the NSHCDA Talent Pool.

As requested, the candidate's CV is attached to this email for your review.

Candidate: ${candidateName}

Please treat the information contained in the CV as confidential and use it only for legitimate recruitment and employment-related purposes.

This CV was provided through the Nasarawa State Human Capital Development Agency (NSHCDA) Opportunities Portal.

Best regards,

NSHCDA Opportunities Portal
Nasarawa State Human Capital Development Agency
`,

      attachments: [
        {
          filename: `${candidateName.replace(
            /[^a-zA-Z0-9]/g,
            "_"
          )}_CV.pdf`,

          content: cvBuffer,

          contentType:
            cvResponse.headers["content-type"] ||
            "application/pdf",
        },
      ],
    };

    return await transporter.sendMail(
      mailOptions
    );

  } catch (error) {
    console.error(
      "❌ Failed to send candidate CV:",
      error.message
    );

    throw error;
  }
};

module.exports = {
  sendRegistrationEmail,
  sendOpportunityNotificationEmail,
  sendCVToEmployer,
};
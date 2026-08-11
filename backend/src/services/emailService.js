const nodemailer = require("nodemailer");

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

module.exports = {
  sendRegistrationEmail,
  sendOpportunityNotificationEmail,
};
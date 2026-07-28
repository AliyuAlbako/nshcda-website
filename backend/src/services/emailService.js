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

const sendRegistrationEmail = async ({ firstName, email }) => {
    const mailOptions = {
        from:`"NSHCDA Opportunities Portal" <${process.env.EMAIL_USER}>`,
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

module.exports = {
    sendRegistrationEmail,
};
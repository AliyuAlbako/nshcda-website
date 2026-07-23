const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendRegistrationEmail = async ({ email, firstName }) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Employment Profile Registration Received",
        text: `Dear ${firstName},

Thank you for registering your Employment Profile on the NSHCDA Opportunities Portal.

We have successfully received your profile.

Please note that registration does not guarantee employment. Your profile will be considered whenever opportunities matching your qualifications and skills become available.

Regards,
NSHCDA
`,
    });
};

module.exports = {
    sendRegistrationEmail,
};
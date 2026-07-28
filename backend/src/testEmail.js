require("dotenv").config();

const { sendRegistrationEmail } = require("./services/emailService");

(async () => {
    try {
        await sendRegistrationEmail({
            firstName: "Aliyu",
            email: "alirilwan03@gmail.com",
        });

        console.log("✅ Email sent successfully");
    } catch (err) {
        console.error("❌ Email failed");
        console.error(err);
    }
})();
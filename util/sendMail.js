const nodemailer = require("nodemailer");
const sendMail = async (subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.EMAIL_PWD,
            },
        });
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: process.env.USER_EMAIL,
            subject,
            html: `Customer Email: <b>${text}</b>`,
        });
        console.log("Email have been delivered successfully");
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = sendMail;

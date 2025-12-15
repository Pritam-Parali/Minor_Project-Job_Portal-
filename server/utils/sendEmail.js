// backend/utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // from .env
        pass: process.env.EMAIL_PASS, // app password or SMTP password
    },
});

export const sendEmail = async ({ to, subject, text, html }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
    };
    return transporter.sendMail(mailOptions);
};

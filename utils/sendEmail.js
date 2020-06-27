const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) => {
    // create reusable transporter object using the default SMTP transport
    // console.log(options);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    // console.log(transporter);

    // send mail with defined transport object

    let info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    });

    console.log('Message sent: %s', info.messageId);

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

module.exports = sendEmail;

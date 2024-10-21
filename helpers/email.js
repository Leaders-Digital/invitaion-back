const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'ssl0.ovh.net', // OVH SMTP Host
  port: 465, // or 587 for TLS
  secure: true, // Use true for port 465 (SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
  logger: true,
});

const sendOrderEmail = (recipientEmail, qrCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Your Invitation QR Code',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2>Scan the QR code below to validate your invitation!</h2>
        <p>Thank you for signing up! Please scan the QR code below to retrieve your information.</p>
        <img src="cid:qrcode" alt="QR Code" style="width:200px; height:auto;" />
      </div>
    `,
    attachments: [
      {
        filename: 'qrcode.png',
        content: qrCode.split('base64,')[1],
        encoding: 'base64',
        cid: 'qrcode', // This is the content ID to reference the image in the HTML
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};

module.exports = { sendOrderEmail };

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
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
});

const sendOrderEmail = (recipientEmail, qrCode) => {
  console.log('Sending email to:', recipientEmail);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Your Invitation QR Code',
    html: `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
       <!-- Logo Section -->
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 24px; color:#d47e00; text-align: center; margin-bottom: 20px;">Invitation Officielle</h1>
        <p style="font-size: 18px; color: #555; text-align: center;">Merci de votre inscription à notre événement exclusif!</p>
        
        <p style="font-size: 16px; color: #555; text-align: center; line-height: 1.6;">
          Nous avons hâte de vous accueillir. Veuillez scanner le code QR ci-dessous pour valider votre invitation et récupérer toutes les informations nécessaires.
        </p>
  
        <div style="text-align: center; margin-top: 20px;">
          <img src="cid:qrcode" alt="QR Code" style="width: 200px; height: auto; border-radius: 4px; border: 1px solid #ddd;" />
        </div>
  
        <p style="font-size: 16px; color: #555; text-align: center; margin-top: 20px;">
          <strong>Événement :</strong> événement Wake Up <br/>
          <strong>Date :</strong> Jeudi 24 octobre 2024 à 19h30.<br/>
          <strong>Lieu :</strong> Four Seasons Hotels and Resorts , Gammarth
        </p>
  
        <div style="border-top: 1px solid #eaeaea; margin-top: 20px; padding-top: 20px; text-align: center;">
          <p style="font-size: 14px; color: #999;">
            Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:contact@leaders-makeup.com" style="color: #4CAF50; text-decoration: none;">contact@example.com</a>.
          </p>
        </div>
      </div>
    </div>
  `,
    attachments: [
      {
        filename: 'qrcode.png',
        content: qrCode.split('base64,')[1],
        encoding: 'base64',
        cid: 'qrcode', // This is the Content-ID for the QR code image
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

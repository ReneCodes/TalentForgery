const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (html: string, profilePictureData?: any) => {

  let profileInfo = profilePictureData ? [{
    filename: 'profile_picture.jpg',
    content: profilePictureData,
    cid: 'profilePicture' // Unique identifier for the attachment
  }] : [];

  const mailOptions = {
    from: process.env.EMAIL_ACCOUNT,
    // to: user.userEmail,
    to: process.env.EMAIL_ACCOUNT,
    subject: "Nodemailer Test",
    html: html,
    attachments: profileInfo
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) console.log(error);
  });
};

module.exports = { sendEmail };
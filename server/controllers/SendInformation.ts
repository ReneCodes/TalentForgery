const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  }
});

const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendEmail = async (html: string, user_sent: string, subject: string, profilePictureData?: any) => {

  let profileInfo = profilePictureData ? [{
    filename: 'profile_picture.jpg',
    content: profilePictureData,
    cid: 'profilePicture' // Unique identifier for the attachment
  }] : [];

  const mailOptions = {
    from: process.env.EMAIL_ACCOUNT,
    to: user_sent,
    // to: process.env.EMAIL_ACCOUNT,
    subject,
    html: html,
    attachments: profileInfo
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) console.log(error);
  });
};

const sendMessage = async (number: string, code: string) => {

  const body = `Confirm your phone number on the Minon Mentor app with this code ${code}`;

  client.messages
    .create({
      body,
      from: process.env.TWILLIO_NUMBER,
      to: number
    })
    .catch((error: any) => console.error('Error sending SMS:', error));

};

module.exports = { sendEmail, sendMessage };
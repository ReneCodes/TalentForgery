import { Request, Response } from "express";
const { getUserByEmail, getUserByNumber } = require("../models/UserModel");
const { sendEmail, sendMessage } = require("./SendInformation");
const { saveCode, checkCode, deleteCode, checkContactWaiting } = require("../models/Codes");

const createCode = async () => {

  const code = [];
  for (let index = 0; index < 4; index++) {
    code.push(Math.floor(Math.random() * 9));
  };

  return code.join('');
};

const validateEmail = async (req: Request, res: Response) => {

  const { email } = req.body;

  if (!email) return res.status(400).json("Not enough information provided");

  const emailRegistered = await getUserByEmail(email);
  if (emailRegistered) return res.status(409).json("Email already confirmed");

  const emailWaiting = await checkContactWaiting(email);
  if (emailWaiting) return res.status(409).json("Email waiting to be confirmed");

  const code = await createCode();
  await saveCode(code, email, 'email');

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Email Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }

      h1 {
        color: #333;
      }

      p {
        margin-bottom: 16px;
      }

      .verification-code {
        font-size: 28px;
        font-weight: bold;
        background-color: #f2f2f2;
        padding: 12px;
        border-radius: 4px;
        display: inline-block;
      }

      .signature {
        font-style: italic;
        color: #888;
      }
    </style>
  </head>
  <body>
    <h1>Email Confirmation</h1>
    <p>Dear user,</p>
    <p>Thank you for registering. Please use the following verification code to confirm your email:</p>
    <p class="verification-code">${code}</p>
    <p>Please enter this code in the appropriate field to complete the email verification process.</p>
    <p class="signature">Minon Mentor</p>
  </body>
  </html>
  `;

  sendEmail(html, email, 'Confirm email Minon Mentor');
  return res.status(200).json("Check your email");
};

const confirmEmail = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json("Not enough information provided");

  const isWriteCode = await checkCode(email, code);
  if (isWriteCode === 'Not Found') {
    res.status(404).json(isWriteCode);
  } else if (isWriteCode === 'Wrong Code') {
    res.status(400).json(isWriteCode);
  } else {
    await deleteCode(email);
    return res.status(200).json(isWriteCode);
  }

};

const validateNumber = async (req: Request, res: Response) => {

  const { number } = req.body;
  if (!number) return res.status(400).json("Not enough information provided");

  const numberRegistered = await getUserByNumber(number);
  if (numberRegistered) return res.status(409).json("Number already confirmed");

  const numberWaiting = await checkContactWaiting(number);
  if (numberWaiting) return res.status(409).json("Number waiting to be confirmed");

  const code = await createCode();
  await saveCode(code, number, 'number');

  sendMessage(number, code);
  return res.status(200).json("Check your smartphone");
};

const confirmNumber = async (req: Request, res: Response) => {
  const { number, code } = req.body;
  if (!number || !code) return res.status(400).json("Not enough information provided");

  const rightCode = await checkCode(number, code);
  if (rightCode === 'Not Found') {
    res.status(404).json(rightCode);
  } else if (rightCode === 'Wrong Code') {
    res.status(409).json(rightCode);
  } else {
    await deleteCode(number);
    return res.status(200).json(rightCode);
  }

};

module.exports = { validateEmail, confirmEmail, validateNumber, confirmNumber };








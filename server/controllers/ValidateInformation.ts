import { Request, Response } from "express";
const { getUserByEmail } = require("../models/UserModel");
const { sendEmail } = require("./SendInformation");

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

  const code = await createCode();
  const html = ``;
  sendEmail(html);

};

module.exports = { validateEmail };
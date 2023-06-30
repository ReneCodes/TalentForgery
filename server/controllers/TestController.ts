import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const { correctQuestions } = require("../models/QuestionsModel");
const { updateUserStats } = require('../models/StatsModel');
const nodemailer = require('nodemailer');

import { TestCorrectionType } from '../types/questions';

const handleTest = async (req: Request, res: Response) => {

  const { tutorial_id, answers, question_ids } = req.body;
  const session_token = req.cookies.session_token;

  try {
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    if (!tutorial_id || !answers || !question_ids) { return res.status(400).json('Not enough information provided'); }

    const [testCorrection, userPassed, totalRight, totalWrong] = await correctQuestions(answers, question_ids);

    await updateUserStats(user_id, userPassed, totalRight, totalWrong);
    // await sendEmail(testCorrection, userPassed, totalRight, totalWrong);

    return res.status(200).json('Check your email');
  } catch (error) {
    res.status(500).json('Server Failed');
  }
};

const hanleEmailData = async

const sendEmail = async (testCorrection: TestCorrectionType, userPassed: boolean, totalRight: number, totalWrong: number) => {
  const html = `<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello</title>
  </head>

  <body style="width: 100%; height: 100%; box-sizing: border-box;">
    <div style="width: max-content; height: max-content;">
      <table>
        <tr>
          <h1>This are your latest results</h1>
        </tr>

        <div
          style="max-width: 500px; flex-wrap: wrap;text-align: start; display: flex; flex-direction: column; gap: 20px;">
          <tr>
            <div
              style="flex-wrap: wrap; height: max-content;  width: max-content;display: flex; flex-direction: column; align-items: start; justify-content: start;">
              <h2 style="height: max-content;">Total: 8 / 10</h2>
              <h2 style="height: max-content;"> Failed </h2>
            </div>
          </tr>

          <tr>
            <div>
              <table>
                <tr>
                  <div>
                    <h2>This is the Question: </h2>
                    <ul style="flex-wrap: wrap; display: flex; flex-direction: row; gap: 40px;">
                      <li>this is an option</li>
                      <li style="color: green;">when its green its the answer</li>
                      <li style="color: red;">press delete to remove the tutorial</li>
                    </ul>
                  </div>
                </tr>
                <tr>
                  <div>
                    <h2>hi: </h2>
                    <ul style="flex-wrap: wrap; display: flex; flex-direction: row; gap: 40px;">
                      <li>1</li>
                      <li>2</li>
                      <li style="color: green;">3</li>
                    </ul>
                  </div>
                </tr>
                <tr>
                  <div>
                    <h2>Where is steve?: </h2>
                    <ul style="flex-wrap: wrap; display: flex; flex-direction: row; gap: 40px;">
                      <li style="color: green;">Detroit</li>
                      <li style="color: red;">Michigan</li>
                      <li>Orlando</li>
                    </ul>
                  </div>
                </tr>

              </table>
            </div>
          </tr>

        </div>
      </table>
    </div>
  </body>

  </html>`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_ACCOUNT,
    to: process.env.EMAIL_ACCOUNT,
    subject: "Nodemailer Test",
    html: html,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) console.log(error);
    else {
      console.log("Email sent: " + info.response);
    }
  });

};

module.exports = { handleTest };
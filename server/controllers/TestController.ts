import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const { correctQuestions } = require("../models/QuestionsModel");
const { updateUserStats } = require('../models/StatsModel');
const { getUserInfo } = require('../models/UserModel');
const nodemailer = require('nodemailer');
const { validateTestDone } = require('../middleware/Validation');


import { TestCorrectionType } from '../types/questions';

const handleTest = async (req: Request, res: Response) => {

  const informationIsRight = await validateTestDone(req, res);
  if (!informationIsRight) return res.status(400).json("Not enough information provided");

  try {

    const session_token = req.cookies.session_token;
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    const { tutorial_id, answers, question_ids } = req.body;

    const [testCorrection, userPassed, totalRight, totalWrong] = await correctQuestions(answers, question_ids);

    await updateUserStats(user_id, userPassed, totalRight, totalWrong);
    const [questionsString, userPassedText] = await handleEmailData(testCorrection, userPassed);

    const userEmail = await getUserInfo(user_id).email;
    await sendEmail(userPassedText, totalRight, totalWrong, questionsString, userEmail);

    return res.status(200).json('Check your email');
  } catch (error) {
    res.status(500).json('Server Failed');
  }
};

const handleEmailData = async (testCorrection: TestCorrectionType[], userPassed: boolean) => {

  let questionsString = '';
  let userPassedText = '';

  userPassedText = userPassed ?
    '<h2 style="height: max-content;margin-left:20px; color: green;"> Passed </h2>' :
    '<h2 style="height: max-content;margin-left:20px; color: red;"> Failed </h2>';

  testCorrection.forEach((question) => {

    questionsString += `<tr><div><h2>${question.question}</h2><ul style="flex-wrap: wrap; display: flex; flex-direction: row; gap: 40px;">`;

    question.options.forEach((option) => {
      if (question.failed && question.userAnswer === option) {
        questionsString += `<li style="color: red; margin-right:10px;"> ${option} </li>`;
      } else if (option === question.rightAnswer) {
        questionsString += `<li style="color: green; margin-right:10px;"> ${option} </li>`;
      } else {
        questionsString += `<li style=" margin-right:10px;">${option}</li>`;
      }
    })
    questionsString += `</ul></div></tr>`;
  });

  return [questionsString, userPassedText];
};

const sendEmail = async (
  userPassed: string, totalRight: number,
  totalWrong: number,
  questionsString: string,
  userEmail: string,
) => {

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
      <div>
        <tr>
          <h1>These are your latest results</h1>
        </tr>
      </div>

        <div style="max-width: 500px; flex-wrap: wrap;text-align: start; display: flex; flex-direction: column; gap: 20px;">
          <tr>
            <div style="flex-wrap: wrap; height: max-content; width: max-content;display: flex; flex-direction: column; align-items: start; justify-content: start;">
              <h2 style="height: max-content;">Total: ${totalRight} / ${totalRight + totalWrong} </h2>
              ${userPassed}
            </div>
          </tr>
          ${questionsString}
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
    // to: userEmail,
    to: process.env.EMAIL_ACCOUNT,
    subject: "Nodemailer Test",
    html: html,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) console.log(error);
  });

};

module.exports = { handleTest };
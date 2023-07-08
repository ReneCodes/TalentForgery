import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const { correctQuestions } = require("../models/QuestionsModel");
const { updateUserStats } = require('../models/StatsModel');
const { getUserInfo } = require('../models/UserModel');
const { sendEmail } = require('./SendInformation');
const { validateTestDone } = require('../middleware/Validation');
const { Tutorial } = require('../models/Schemas');
const fs = require('fs');
const path = require('path');

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
    const tutorial = await Tutorial.findOne({ where: { tutorial_id } });
    const [questionsString, userPassedText] = await handleEmailData(testCorrection, userPassed);

    const userInfo = await getUserInfo(user_id);
    const userEmail = userInfo.email;
    const profile_picture = userInfo.profile_picture;

    await handleSendEmail(
      { userPassedText, totalRight, totalWrong },
      { userEmail, profile_picture },
      { questionsString, title: tutorial.title, description: tutorial.description }
    );

    return res.status(200).json('Check your email');
  } catch (error) {
    res.status(500).json('Server Failed');
  }
};

const handleEmailData = async (testCorrection: TestCorrectionType[], userPassed: boolean) => {

  let questionsString = '';
  let userPassedText = '';

  userPassedText = userPassed ?
    `<div style="color: #2e7d32;" >
      <h3 style="font-size: 18px; font-weight: 400; margin: 5px 0;" > Passed </h3>
     </div>
    ` :
    `<div style="color: #c62828;" >
      <h3 style="font-size: 18px; font-weight: 400; margin: 5px 0;" > Failed </h3>
     </div>
    `

  testCorrection.forEach((question) => {

    questionsString += `
    <tr>
      <td>
        <h2 style="font-size: 20px; font-weight: 400; margin: 0;"><strong>${question.question}</strong></h2>
        <ul style="list-style-type: circle">
        `;

    question.options.forEach((option) => {
      if (question.failed && question.userAnswer === option) {
        questionsString += `
        <li style="color: #c62828; margin-bottom:10px;">
          <h3 style="font-size: 16px; font-weight: 400; margin: 0 5px;"> ${option} </h3>
        </li>`;
      } else if (option === question.rightAnswer) {
        questionsString += `
        <li style="color: #2e7d32; margin-bottom:10px;">
          <h3 style="font-size: 16px; font-weight: 400; margin: 0 5px;"> ${option} </h3>
        </li>`;
      } else {
        questionsString += `
        <li style="color: #212121; margin-bottom:10px;">
          <h3 style="font-size: 16px; font-weight: 400; margin:0  5px;"> ${option} </h3>
        </li>`;
      }
    });

    questionsString += `</ul></td></tr>`;
  });

  return [questionsString, userPassedText];
};

const handleSendEmail = async (
  stats: { userPassedText: string, totalRight: number, totalWrong: number, },
  user: { userEmail: string, profile_picture: string },
  tutorial: { questionsString: string, title: string, description: string, }
) => {

  let profilePicturePath;
  if (user.profile_picture) {
    profilePicturePath = `images/profile_pictures/${user.profile_picture}`;
  } else {
    profilePicturePath = `images/profile_pictures/default_user.png`;
  }
  const profilePictureData = fs.readFileSync(path.resolve(profilePicturePath));

  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Results</title>
  </head>

  <body style="width: 100%; margin: 0; padding: 0; background-color: #ffffff; font-family: 'Poppins', sans-serif;">

    <table style="width: 100%; max-width: 1000px; margin: 0 auto; background-color: #5b5b5b; color: white;">
      <tr>
        <td style="padding: 9px 20px;">
          <h2 style="font-size: 20px; font-weight: 400; margin: 0;">Minon Mentor</h2>
        </td>
        <td style="padding: 9px 20px; text-align: right;">
        <h4 style="font-size: 14px; font-weight: 400; margin: 0;">06/07/2023</h4>
      </td>
      </tr>
    </table>

    <table style="width: 100%; max-width: 1000px; margin: 0 auto; padding: 20px;">
      <tr>
        <td style="width: 100px; padding: 20px;">
          <div style="border: 2px solid #212121; width: 100px; height: 100px; border-radius: 50%; overflow: hidden;">
          <img style="object-fit: cover; width: 100%; height: 100%;" src="cid:profilePicture">
          </div>
        </td>
        <td style="padding: 20px;">
            ${stats.userPassedText}
          <div>
            <h3 style="font-size: 16px; font-weight: 400; margin: 0;">Total: ${stats.totalRight} / ${stats.totalRight + stats.totalWrong}</h3>
          </div>
        </td>
      </tr>
    </table>

    <table style="width: 100%; max-width: 1000px; margin: 0 auto; padding: 20px;">
      <tr>
        <td>
          <h2 style="font-size: 20px; font-weight: 400; margin: 0;">${tutorial.title}</h2>
          <p style="font-size: 14px; margin: 0;">${tutorial.description}</p>
        </td>
      </tr>
    </table>

    <table style="width: 100%; max-width: 1000px; margin: 0 auto; padding: 20px; padding: 20px; border: 2px solid #5b5b5b; border-radius: 5px;">
    ${tutorial.questionsString}
    </table>

  </body>
  </html>
  `;

  sendEmail(html, user.userEmail, 'Minon Mentor Tests Result', profilePictureData);
};

module.exports = { handleTest };
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const { correctQuestions } = require("../models/QuestionsModel");
const { updateUserStats } = require('../models/StatsModel');
import { TestCorrectionType } from '../types/questions';

const handleTest = async (req: Request, res: Response) => {

  const { tutorial_id, answers, question_ids } = req.body;
  const session_token = req.cookies.session_token;

  try {
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    if (!tutorial_id || !answers || !question_ids) { return res.status(400).json('Not enough information provided'); }

    const [testCorrection, totalRight, totalWrong] = await correctQuestions(answers, question_ids);
    await updateUserStats(user_id, totalRight, totalWrong);

    // await sendEmail(testCorrection);

    return res.status(200).json('Check your email');
  } catch (error) {
    console.log(error);

    res.status(500).json('Server Failed');
  }
};

const sendEmail = async (testCorrection: TestCorrectionType) => {
  // LOGIC TO SEND THE EMAIL OR TO BUILD THE EMAIL SCHEMA
};

module.exports = { handleTest };
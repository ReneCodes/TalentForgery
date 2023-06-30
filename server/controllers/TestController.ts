import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const { correctQuestions } = require("../models/QuestionsModel");

const handleTest = async (req: Request, res: Response) => {

  const { tutorial_id, answers, question_ids } = req.body;
  const session_token = req.cookies.session_token;

  try {
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    if (!tutorial_id || !answers || !question_ids) { return res.status(400).json('Not enough information provided'); }

    await correctQuestions(answers, question_ids);

  } catch (error) {
    res.status(500).json('Server Failed');
  }



};

module.exports = { handleTest };
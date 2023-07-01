import { createdTutorial } from "../types/tutorial";
const jwt = require("jsonwebtoken");
const {
  createTheTutorial,
  getAllTheTutorials,
} = require("../models/TutorialModel");

const { getTutorialQuestions, getTheQuestions } = require('../models/QuestionsModel');
const { validateTutorialData, validateTutorialId } = require('../middleware/Validation');

import { Request, Response } from "express";
import { fileInput } from '../types/user';

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req: Request, file: File, cb: Function) => {
    cb(null, '../server/videos');
  },
  filename: (req: Request, file: fileInput, cb: Function) => {
    const customFileName = Date.now() + file.originalname;
    cb(null, Date.now() + customFileName);
  },
});

const upload = multer({ storage });

export async function createTutorial(req: any, res: Response) {
  const sessionToken = req.cookies.session_token;
  const user_id = jwt.verify(sessionToken, process.env.SECRET).user_id;

  await upload.single('video_url')(req, res, async (err: Error) => {

    const informationIsRight = await validateTutorialData(req, res);
    if (!informationIsRight) return res.status(400).json("Not enough information provided");

    const { title, description, question_ids, questions_shown, access_date, due_date, }: createdTutorial = req.body;
    if (err) return res.status(500).json('Server failed uploading profile picture');

    try {
      const videoFileName = req.file ? req.file.filename : 'no_file.mp4';
      const tutorialData = { title, video_url: videoFileName, description, question_ids, questions_shown, access_date, due_date, };

      tutorialData.video_url = videoFileName;
      const [tutorial_id, questions_id] = await createTheTutorial(tutorialData, user_id);
      res.status(201).json({ message: "Tutorial created.", tutorial_id, questions_id });

    } catch (error) {
      res.status(500).json("Failed to create tutorial.");
    }
  })

};

export async function getAllTutorials(req: Request, res: Response) {
  try {
    const tutorials = await getAllTheTutorials();

    res.status(200).json(tutorials);
  } catch (error) {
    res.status(500).json("Failed to retrieve tutorial");
  }
};

export async function getQuestions(req: Request, res: Response) {

  const informationIsRight = await validateTutorialId(req, res);
  if (!informationIsRight) return res.status(400).json("Not enough information provided");

  try {
    const { tutorial_id } = req.body;
    const questions = await getTutorialQuestions(tutorial_id);
    res.status(200).json(questions);
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage === "Invalid tutorial id") { res.status(404).json(errorMessage); }
    else res.status(500).json('Server failed');
  }


};

export async function getAllQuestions(req: Request, res: Response) {

  try {
    const questions = await getTheQuestions();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json('Server failed');
  }


};

module.exports = { createTutorial, getAllTutorials, getQuestions, getAllQuestions };

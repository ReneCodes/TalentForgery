import { createdTutorial } from "../types/tutorial";
const jwt = require("jsonwebtoken");
const {
  createTheTutorial,
  getAllTheTutorials,
} = require("../models/TutorialModel");
const { getTutorialQuestions, getTheQuestions } = require('../models/QuestionsModel');
import { Request, Response } from "express";


export async function createTutorial(req: Request, res: Response) {
  const sessionToken = req.cookies.session_token;
  const user_id = jwt.verify(sessionToken, process.env.SECRET).user_id;
  const {
    title,
    video_url,
    description,
    question_ids,
    questions_shown,
    access_date,
    due_date,
  }: createdTutorial = req.body;

  if (
    !title ||
    !video_url ||
    !description ||
    !question_ids ||
    !questions_shown ||
    !access_date ||
    !due_date
  ) {
    return res.status(400).json("All fields are required");
  }

  try {
    const tutorialData = {
      title,
      video_url,
      description,
      question_ids,
      questions_shown,
      access_date,
      due_date,
    };
    await createTheTutorial(tutorialData, user_id);
    res.status(201).json("Tutorial created.");
  } catch (error) {
    if ((error as Error).message === "Unauthorized") {
      res.status(403).json("Unauthorized");
    } else {
      const errorMessage = (error as Error).message;
      console.log(errorMessage);
      res.status(500).json("Failed to create tutorial.");
    }
  }
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

  const { tutorial_id } = req.body;
  if (!tutorial_id) res.status(400).json("Not enough information provided");

  try {
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

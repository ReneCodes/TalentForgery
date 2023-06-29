import { createdTutorial } from "../types/tutorial";
const jwt = require("jsonwebtoken");
const {
  createTheTutorial,
  getAllTheTutorials,
} = require("../models/TutorialModel");
import { Request, Response } from "express";
const { createQuestion } = require("../models/QuestionsModel");

// {
//   "questions": [
//     { "question": "Question 1", "options": ["Option 1", "Option 2"], "actual_answer": "Option 1", "correct_answer": "Option 1" },
//     { "question": "Question 2", "options": ["Option 1", "Option 2"], "actual_answer": "Option 2", "correct_answer": "Option 2" }
//   ]
// }

export async function createTutorial(req: Request, res: Response) {
  const sessionToken = req.cookies.session_token;
  const user_id = jwt.verify(sessionToken, process.env.SECRET).user_id;
  const {
    title,
    video_url,
    description,
    questions,
    question_ids,
    questions_shown,
    access_date,
    due_date,
  }: createdTutorial = req.body;

  if (
    !title ||
    !video_url ||
    !description ||
    !questions ||
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
      questions,
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
      console.log(error);
      res.status(500).json("Failed to create tutorial.");
    }
  }
}

export async function getAllTutorials(req: Request, res: Response) {
  try {
    const tutorials = await getAllTheTutorials();

    res.status(200).json(tutorials);
  } catch (error) {
    res.status(500).json("Failed to retrieve tutorial");
  }
}

module.exports = { createTutorial, getAllTutorials };

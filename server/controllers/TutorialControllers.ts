// const { Request, Response } = require("express");
// @ts-ignore
import { Request, Response } from "express";
import { createdTutorial } from "../types/tutorial";
const jwt = require("jsonwebtoken");
const {
  createTheTutorial,
  getAllTheTutorials,
} = require("../models/TutorialModel");

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
    const result = await createTheTutorial(tutorialData, user_id);
    res.status(201).json("Tutorial created.");
  } catch (error) {
    if ((error as Error).message === "Unauthorized") {
      res.status(403).json("Unauthorized");
    } else {
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

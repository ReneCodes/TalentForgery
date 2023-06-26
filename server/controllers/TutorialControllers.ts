import { Request, Response } from "express";
const {
  createTheTutorial,
  getAllTheTutorials,
} = require("../models/TutorialModel");

export async function createTutorial(req: Request, res: Response) {
  try {
    const tutorialData = req.body;
    const result = await createTheTutorial(tutorialData);
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to create tutorial" });
  }
}

export async function getAllTutorials(req: Request, res: Response) {
  try {
    const tutorials = await getAllTheTutorials();
    res.status(200).json(tutorials);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve tutorial" });
  }
}

module.exports = { createTutorial, getAllTutorials };

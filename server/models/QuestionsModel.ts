const crypto = require("crypto");

const { Question } = require('./Schemas');
import { QuestionType } from "../types/questions";

async function createQuestion(questionData: QuestionType) {
  try {
    const newQuestion = await Question.create({
      ...questionData,
    });
    return newQuestion;
  } catch (error) {
    console.log((error as Error).message);

    throw new Error("Failed to create question");
  }
}

module.exports = { createQuestion };

const { Question, Tutorial } = require('./Schemas');
import { UUID } from "crypto";
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
};

async function getTutorialQuestions(tutorial_id: UUID) {
  const tutorial = await Tutorial.findOne({ where: { tutorial_id } });
  if (!tutorial) throw new Error('Invalid tutorial id');
  else {
    const questions = await Question.findAll(
      {
        where: { tutorial_id },
        attributes: ['question', 'options', 'answer'],
      });
    return questions;
  }
}

module.exports = { createQuestion, getTutorialQuestions };

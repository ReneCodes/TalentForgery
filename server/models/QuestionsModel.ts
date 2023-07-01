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
        attributes: ['question', 'options', 'answer', 'question_id'],
      });
    return questions;
  }
};

async function getTheQuestions() {
  const allQuestions = await Question.findAll({
    where: {},
    attributes: ['question', 'options', 'answer', 'question_id'],
  });
  return allQuestions;
};

async function getQuestion(question_id: UUID) {
  return await Question.findOne({ where: { question_id } });
};

async function correctQuestions(answers: string[], question_ids: UUID[]) {

  let index = 0;

  let totalRight = 0;
  let totalWrong = 0;
  const everything = [];

  for (const userAnswer of answers) {

    const questionFound: QuestionType = await getQuestion(question_ids[index]);
    const rightAnswer = questionFound.answer;
    let failed = false;

    if (rightAnswer == userAnswer) {
      failed = false;
      totalRight++;
    } else {
      failed = true;
      totalWrong++;
    }

    everything.push({
      failed,
      question: questionFound.question,
      options: questionFound.options,
      userAnswer,
      rightAnswer,
    });

    index++;
  };

  const userPassed = totalRight >= Math.round((totalRight + totalWrong) / 2) ? true : false;

  return [everything, userPassed, totalRight, totalWrong];
};

module.exports = {
  createQuestion,
  getTutorialQuestions,
  getTheQuestions,
  correctQuestions,
};

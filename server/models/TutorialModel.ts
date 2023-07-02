export { };
const { Tutorial } = require('./Schemas');
import { UUID } from "crypto";
import { createdTutorial } from "../types/tutorial";
const { createQuestion } = require("./QuestionsModel");
const crypto = require("crypto");

const createTheTutorial = async (providedInformation: createdTutorial, user_id: UUID) => {

  const questions_id: string[] = [];
  const questionsParsed = JSON.parse(providedInformation.question_ids);

  const tutorial = await Tutorial.create({
    ...providedInformation,
    creator_id: user_id,
    tutorial_id: crypto.randomUUID(),
    questions_id,
  });

  for (const question of questionsParsed) {
    const currQuestionId = crypto.randomUUID();
    questions_id.push(currQuestionId);
    await createQuestion({
      question: question.question,
      options: question.options,
      answer: question.answer,
      question_id: currQuestionId,
    });
  };

  tutorial.questions_id = [...questions_id];
  await tutorial.save();
  return [tutorial.tutorial_id, questions_id];
};

const getAllTheTutorials = async () => {
  try {
    const tutorials = await Tutorial.findAll();
    return tutorials;
  } catch (error) {
    throw new Error("Failed to retrieve tutorials");
  }
};

module.exports = { createTheTutorial, getAllTheTutorials };
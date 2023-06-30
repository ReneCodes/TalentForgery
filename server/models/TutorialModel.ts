export { };
const { Tutorial } = require('./Schemas');
import { UUID } from "crypto";
import { createdTutorial } from "../types/tutorial";
const { createQuestion } = require("./QuestionsModel");
const crypto = require("crypto");

const createTheTutorial = async (providedInformation: createdTutorial, user_id: UUID) => {

  const tutorial = await Tutorial.create({
    ...providedInformation,
    creator_id: user_id,
    tutorial_id: crypto.randomUUID()
  });

  const questionsParsed = JSON.parse(providedInformation.question_ids);

  for (const question of questionsParsed) {
    await createQuestion({
      question: question.question,
      options: question.options,
      answer: question.answer,
      tutorial_id: tutorial.tutorial_id,
    })
  }

}

const getAllTheTutorials = async () => {
  try {
    const tutorials = await Tutorial.findAll();
    return tutorials;
  } catch (error) {
    throw new Error("Failed to retrieve tutorials");
  }
};

module.exports = { createTheTutorial, getAllTheTutorials };
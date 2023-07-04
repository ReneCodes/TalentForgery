export { };
const { Tutorial, User } = require('./Schemas');
import { UUID } from "crypto";
import { createdTutorial } from "../types/tutorial";
const { createQuestion } = require("./QuestionsModel");
const crypto = require("crypto");
const { Op } = require('sequelize');

const createTheTutorial = async (providedInformation: createdTutorial, user_id: UUID) => {

  const questions_id: string[] = [];
  const questionsParsed = JSON.parse(providedInformation.question_ids);
  providedInformation.tags = JSON.parse(providedInformation.tags);

  const tutorial = await Tutorial.create({
    ...providedInformation,
    creator_id: user_id,
    tutorial_id: crypto.randomUUID(),
    questions_id,
  });

  if (questionsParsed) {
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
  };

  await tutorial.save();
  return [tutorial.tutorial_id, questions_id];

};

const getUserTutorials = async (user_id: UUID) => {
  const user = await User.findOne({ where: { user_id } });
  const allVideos = [];

  const normal_videos = await Tutorial.findAll(
    {
      where: { tags: null },
      attributes: ['tutorial_id', 'title', 'video_url', 'video_thumb',
        'questions_id', 'description', 'questions_shown', 'access_date', 'tags', 'due_date'],
    });

  // FINDS EVERY TUTORIAL THAT HAS AT LEAST ONE OF THE USER TAGS
  const tagged_videos = await Tutorial.findAll({
    where: {
      tags: {
        [Op.overlap]: user.tags,
      },
    },
    attributes: ['tutorial_id', 'title', 'video_url', 'questions_id', 'description',
      'questions_shown', 'access_date', 'tags', 'due_date', 'video_thumb'],
  });

  allVideos.push(normal_videos);
  allVideos.push(tagged_videos);

  return allVideos;
};

const getAllTheTutorials = async () => {
  try {
    const tutorials = await Tutorial.findAll({
      attributes: ['tutorial_id', 'title', 'video_url', 'questions_id', 'description',
        'questions_shown', 'access_date', 'tags', 'due_date', 'video_thumb'],
    });
    return tutorials;
  } catch (error) {
    throw new Error("Failed to retrieve tutorials");
  }
};

module.exports = { createTheTutorial, getAllTheTutorials, getUserTutorials };
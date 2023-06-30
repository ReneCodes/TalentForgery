export {};
const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const { User } = require("./UserModel");
import { UUID } from "crypto";
const crypto = require("crypto");
import { createdTutorial } from "../types/tutorial";
const { QuestionModel, createQuestion } = require("./QuestionsModel");
console.log("This is question model ", QuestionModel);
const { Invites } = require("./InviteModel");
console.log("This should be Invites ", Invites);

const Tutorial = sequelize.define("tutorial", {
  tutorial_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creator_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  video_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  question_ids: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  questions_shown: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  access_date: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Tutorial.hasMany(QuestionModel, {
  foreignKey: "tutorialId",
  allowNull: false,
});

QuestionModel.belongsTo(Tutorial, {
  foreignKey: "tutorialId",
  allowNull: false,
});

const createTheTutorial = async (
  providedInformation: createdTutorial,
  user_id: UUID
) => {
  const creator = await User.findOne({ where: { user_id } });

  if (creator.role !== "admin") {
    throw new Error("Unauthorized");
  } else {
    const tutorial = await Tutorial.create({
      ...providedInformation,
      creator_id: user_id,
    });
    const questionIds = [];
    for (const questionData of providedInformation.question_ids) {
      const question_id = crypto.randomUUID();

      const question = await createQuestion({
        ...questionData,
        question_id,
        tutorialId: tutorial.tutorial_id, // Assign the tutorialId to the question
      });

      questionIds.push(question_id);

      // Update the tutorial with question_ids
      await tutorial.update({ question_ids: questionIds });
    }
  }
};

const getAllTheTutorials = async () => {
  try {
    const tutorials = await Tutorial.findAll();
    return tutorials;
  } catch (error) {
    throw new Error("Failed to retreive tutorials");
  }
};

module.exports = { Tutorial, createTheTutorial, getAllTheTutorials };

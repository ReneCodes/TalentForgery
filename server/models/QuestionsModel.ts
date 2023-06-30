const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const crypto = require("crypto");
const { Tutorial } = require("./TutorialModel");
console.log("This is tutorial in QuestionModel", Tutorial);

import { Question } from "../types/questions";

const { Invites } = require("./InviteModel");
console.log("This should be InvitesModel in QuestionModel ", Invites);

const QuestionModel = sequelize.define("Question", {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  question_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // tutorialId: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   unique: true,
  //   references: {
  //     model: Tutorial,
  //     key: "tutorial_id",
  //   },
  // },
});

async function createQuestion(questionData: Question) {
  try {
    const newQuestion = await QuestionModel.create({
      ...questionData,
      question_id: crypto.randomUUID(),
    });
    return newQuestion;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create question");
  }
}

module.exports = { QuestionModel, createQuestion };

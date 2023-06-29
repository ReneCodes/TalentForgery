const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const crypto = require("crypto");
import { Question } from "../types/questions";

const QuestionModel = sequelize.define("Question", {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  actual_answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correct_answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

async function createQuestion(questionData: Question) {
  try {

    const newQuestion = await QuestionModel.create({
      ...questionData,
      question_id: crypto.randomUUID(),
    });
    return newQuestion;
  } catch (error) {
    throw new Error("Failed to create question");
  }
}

module.exports = { QuestionModel, createQuestion };

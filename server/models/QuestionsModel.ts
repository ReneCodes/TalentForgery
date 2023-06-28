const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Question = sequelize.define("Question", {
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
});

module.exports = Question;

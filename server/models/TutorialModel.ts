const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const crypto = require("crypto");
export {};

const Tutorial = sequelize.define("tutorial", {
  creator_id: {
    type: DataTypes.INTEGER,
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
    allowNull: true,
  },
  questions_shown: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  access_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Tutorial;

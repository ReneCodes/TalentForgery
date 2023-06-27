export { };
const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const { User } =  require('./Schemas');
import { UUID } from "crypto";
import { createdTutorial } from "../types/tutorial";

const Tutorial = sequelize.define("tutorial", {
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

const createTheTutorial = async (providedInformaion: createdTutorial, user_id: UUID) => {

  const creator = await User.findOne({ where: { user_id } });

  if (creator.role !== "admin") {
    throw new Error("Unauthorized");
  } else {
    await Tutorial.create({
      ...providedInformaion,
      creator_id: user_id,
    });
    return "Tutorial created!";
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

const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const crypto = require("crypto");
const { User } = require("./UserModel");
import { createdTutorial } from "../types/tutorial";
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
    type: DataTypes.DATE,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Tutorial.belongsTo(User, { foreignKey: "creator_id" })(async () => {
  await sequelize.sync({ alter: true });
})();

// Methods for tutorials: Create Tutorial, get all tutorials

const createTheTutorial = async (providedInformaion: createdTutorial) => {
  try {
    // Create tutorial in db
    const tutorial = await Tutorial.create(providedInformaion);
    return "Tutorial created!";
  } catch (error) {
    throw new Error("Failed to create tutorial");
  }
};

const getAllTheTutorials = async () => {
  try {
    const tutorials = await Tutorial.model.findAll();
    return tutorials;
  } catch (error) {
    throw new Error("Failed to retreive tutorials");
  }
};

module.exports = { Tutorial, createTheTutorial, getAllTheTutorials };

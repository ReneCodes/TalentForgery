const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const { User } = require("./UserModel");
import { UUID } from "crypto";
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

(async () => {
  await sequelize.sync({ alter: true });
})();

// Methods for tutorials: Create Tutorial, get all tutorials

// Tutorial.belongsTo(User, { foreignKey: "creator_id" });

const createTheTutorial = async (
  providedInformaion: createdTutorial,
  user_id: UUID
) => {
  // Create tutorial in db
  const creator = await User.findOne({ where: { user_id } });
  // const creator = await User.findByPk(creator_id);

  console.log(creator);

  if (creator.role !== "pending") {
    throw new Error("Unauthorized");
  } else {
    const tutorial = await Tutorial.create({
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

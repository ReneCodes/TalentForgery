export {};
const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const { User } = require("./UserModel");
import { UUID } from "crypto";
import { createdTutorial } from "../types/tutorial";
const { QuestionModel, createQuestion } = require("./QuestionsModel");

const Tutorial = sequelize.define("tutorial", {
  tutorialId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
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
  questions: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
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
  foreignKey: {
    name: "tutorialId",
    allowNull: false,
  },
});
QuestionModel.belongsTo(Tutorial, {
  foreignKey: {
    name: "tutorialId",
    allowNull: false,
  },
});

const createTheTutorial = async (
  providedInformaion: createdTutorial,
  user_id: UUID
) => {
  const creator = await User.findOne({ where: { user_id } });

  if (creator.role !== "admin") {
    throw new Error("Unauthorized");
  } else {
    const tutorial = await Tutorial.create({
      ...providedInformaion,
      creator_id: user_id,
    });
    const questionIds = [];
    for (const questionData of providedInformaion.questions) {
      const question = await QuestionModel.create(questionData);
      await tutorial.addQuestion(question);
      questionIds.push(question.id);

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

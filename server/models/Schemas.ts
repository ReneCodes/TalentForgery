const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const User = sequelize.define("user", {
  role: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    isEmail: true,
  },
  personal_email: {
    type: DataTypes.TEXT,
    allowNull: true,
    isEmail: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  department: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  invited_by: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  profile_picture: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    isUUID: true,
  },
});

const Invites = sequelize.define("invite", {
  inviteID: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  user_created: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    isUUID: true,
  },
});

const Tutorial = sequelize.define("tutorial", {
  creator_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    isUUID: true,
  },
  tutorial_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    isUUID: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  video_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  questions_id: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  questions_shown: {
    type: DataTypes.INTEGER,
    allowNull: true,
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

const Stats = sequelize.define("stats", {
  user_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    isUUID: true,
  },
  passed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  failed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  watched: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  not_watched: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  correct_questions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  wrong_questions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Question = sequelize.define("question", {
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
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  tutorial_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    isUUID: true,
  },
});

if (process.env.ENV !== 'Test') {
  // SETTING UP THE FOREIGN KEY OF THE INVITES TABLE
  User.hasOne(Invites, { foreignKey: 'user_created', sourceKey: 'user_id' });
  Invites.belongsTo(User, { foreignKey: 'user_created', targetKey: 'user_id' });

  // SETTING UP THE FOREIGN KEY OF THE STATS TABLE
  User.hasMany(Tutorial, { foreignKey: 'creator_id', sourceKey: 'user_id' });
  Tutorial.belongsTo(User, { foreignKey: 'creator_id', targetKey: 'user_id' });

  // SETTING UP THE FOREIGN KEY OF THE STATS TABLE
  User.hasOne(Stats, { foreignKey: 'user_id', sourceKey: 'user_id' });
  Stats.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });

  // SETTING UP THE FOREIGN KEY OF THE STATS TABLE
  Tutorial.hasMany(Question, { foreignKey: 'tutorial_id', sourceKey: 'tutorial_id' });
  Question.belongsTo(Tutorial, { foreignKey: 'tutorial_id', targetKey: 'tutorial_id' });
}

(async () => {
  await sequelize.sync({ alter: true });
})();


module.exports = { User, Tutorial, Invites, Stats, Question }
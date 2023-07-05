const {DataTypes} = require('sequelize');
const sequelize = require('./connection');

const User = sequelize.define('user', {
	role: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	tags: {
		type: DataTypes.ARRAY(DataTypes.TEXT),
		allowNull: true,
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
	tutorials_watched: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: false,
		defaultValue: [],
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

const Tutorial = sequelize.define('tutorial', {
	creator_id: {
		type: DataTypes.TEXT,
		allowNull: true,
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
	video_thumb: {
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

const Stats = sequelize.define('stats', {
	user_id: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
		isUUID: true,
	},
	passed: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	failed: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	watched: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	not_watched: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	correct_questions: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	wrong_questions: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

const Question = sequelize.define('question', {
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
});

const Codes = sequelize.define('code', {
	contact: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	code: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	confirm: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

if (process.env.ENV !== 'Test') {

	// SETTING UP THE FOREIGN KEY OF THE TUTORIAL TABLE
	User.hasMany(Tutorial, {foreignKey: 'creator_id', sourceKey: 'user_id'});
	Tutorial.belongsTo(User, {foreignKey: 'creator_id', targetKey: 'user_id'});

	// SETTING UP THE FOREIGN KEY OF THE STATS TABLE
	User.hasOne(Stats, {foreignKey: 'user_id', sourceKey: 'user_id'});
	Stats.belongsTo(User, {foreignKey: 'user_id', targetKey: 'user_id'});
}

(async () => {
	await sequelize.sync({alter: true});
})();

module.exports = {User, Tutorial, Stats, Question, Codes};

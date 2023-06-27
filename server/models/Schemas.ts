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
  },
});

User.hasOne(Invites, { foreignKey: 'user_created', sourceKey: 'user_id' });
Invites.belongsTo(User, { foreignKey: 'user_created', targetKey: 'user_id' });

(async () => {
  await sequelize.sync({ alter: true });
})();


module.exports = {
  User,
  Invites
}
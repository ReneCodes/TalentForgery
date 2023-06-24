export {};
const crypto = require('crypto');
const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

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
  user_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    isUUID: true,
  },
});

(async () => {
  await sequelize.sync({ alter: true });
})();

const registerNewUser = async () => {

  const userInformation = {
    role: 'admin',
    first_name: 'Bob',
    last_name: 'Alfred',
    email: 'admin@admin.com',
    personal_email: '123@123.com',
    password: 'admin',
    phone: '123456789',
    department: '567-UFG',
    user_id: crypto.randomUUID(),
  };

  const newUSer = await User.create(userInformation);
  return newUSer;
};

const getInfo = async () => {
  const allUsers = await User.findAll();
  return allUsers;
}

module.exports = {
  registerNewUser,
  getInfo,
};
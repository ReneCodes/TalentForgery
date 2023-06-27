
import { UUID } from "crypto";
import { registeredUser, loginUser } from "../types/user";
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const { promisify } = require("util");
const hashAsync = promisify(bcrypt.hash);
const { checkInvite } = require('./InviteModel');

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

(async () => {
  await sequelize.sync({ alter: true });
})();

const registerNewUser = async (providedInformaion: registeredUser) => {
  const userList = await User.findOne({ where: {} });
  const findUser = await User.findOne({ where: { email: providedInformaion.email } });
  const inviteID = await checkInvite(providedInformaion.inviteID);
  if (findUser) throw new Error('User already exists');
  else if (!inviteID && userList !== null) throw new Error('Invalid invite');
  else {
    const hash = await hashAsync(providedInformaion.password, 10);
    providedInformaion.password = hash;

    const role = userList == null ? 'admin' : 'pending';
    const userCreated = await User.create({ role, ...providedInformaion, user_id: crypto.randomUUID() });
    return role === 'admin' ? "Admin User created" : "User created";
  }
};

const loginTheUser = async ({ email, password }: loginUser) => {
  const findUser = await User.findOne({ where: { email } });
  if (!findUser) throw new Error("User dosent exist");
  const samePassword = await bcrypt.compare(password, findUser.password);
  if (!samePassword) throw new Error("Wrong credentials");
  else {
    const { role, first_name, last_name, email, personal_email, phone, department, user_id, } = findUser;
    return [
      { role, first_name, last_name, email, personal_email, phone, department },
      user_id,
    ];
  }
};

const getUserInfo = async (user_id: UUID) => {
  const userInfo = await User.findOne({ where: { user_id } });
  if (!userInfo) throw new Error("user_id is invalid");
  else {
    const { role, first_name, last_name, email, personal_email, phone, department, } = userInfo;
    return { role, first_name, last_name, email, personal_email, phone, department };
  }
};

const deleteUser = async (user_id: UUID) => {
  return await User.destroy({ where: { user_id } });
};

const deleteAnUser = async (userDeleteEmail: string) => {
  User.destroy({ where: { email: userDeleteEmail } });
  return;
};

module.exports = {
  User,
  deleteAnUser,
  registerNewUser,
  getUserInfo,
  loginTheUser,
  deleteUser
};

const fs = require('fs');
import { UUID } from "crypto";
import { registeredUser, loginUser, UserType } from "../types/user";
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const hashAsync = promisify(bcrypt.hash);
const { getUserTutorials } = require('./TutorialModel');
const { User, Stats, Question, Tutorial } = require('./Schemas');

const getUserByEmail = async (email: string) => {
  const userExists = await User.findOne({ where: { email } });
  return userExists !== null ? true : false;
};

const getUserByNumber = async (phone: string) => {
  const userExists = await User.findOne({ where: { phone } });
  return userExists !== null ? true : false;
};

const registerNewUser = async (providedInformation: registeredUser) => {
  const userList = await User.findOne({ where: {} });
  const findUser = await User.findOne({ where: { email: providedInformation.email } });
  if (findUser) throw new Error('User already exists');
  else {
    const hash = await hashAsync(providedInformation.password, 10);
    providedInformation.password = hash;

    const role = userList == null ? 'admin' : 'pending';
    const user_id = crypto.randomUUID();

    await User.create({
      role,
      ...providedInformation,
      user_id,
      tags: [],
    });

    const tutorialsWatch = await getUserTutorials(user_id);
    const not_watched = tutorialsWatch[0].length + tutorialsWatch[1].length;

    await Stats.create({
      user_id,
      not_watched,
    })

    return role === 'admin' ? "Admin User created" : "User created";
  }
};

const loginTheUser = async ({ email, password }: loginUser) => {
  const findUser = await User.findOne({ where: { email } });
  if (!findUser) throw new Error("User doesn't exist");
  const samePassword = await bcrypt.compare(password, findUser.password);
  if (!samePassword) throw new Error("Wrong credentials");
  else {
    const {
      role,
      first_name,
      last_name,
      email,
      personal_email,
      phone,
      department,
      profile_picture,
      user_id,
    } = findUser;
    return [
      { role, first_name, last_name, email, personal_email, phone, department, profile_picture },
      user_id,
    ];
  }
};

const acceptAnUser = async (email: string, tags: string[]) => {
  const findUser = await User.findOne({ where: { email } });
  if (!findUser) throw new Error("User doesn't exist");
  findUser.role = 'user';
  findUser.tags = [...tags];
  await findUser.save();
  return 'User accepted';
}

const rejectAnUser = async (email: string) => {
  const findUser = await User.findOne({ where: { email } });
  if (!findUser) throw new Error("User doesn't exist");
  await deleteAnUser(email);
  return 'User rejected';
}

const getUserInfo = async (user_id: UUID) => {
  const userInfo = await User.findOne({
    where: { user_id },
    attributes: ['role', 'tags', 'first_name', 'last_name', 'email', 'personal_email', 'phone', 'department', 'profile_picture'],
  });
  if (!userInfo) throw new Error("user_id is invalid");
  else {
    return userInfo;
  }
};

const getUsersPending = async (): Promise<UserType[]> => {
  const usersPending: UserType[] = await User.findAll({
    where: { role: 'pending' },
    attributes: ['role', 'first_name', 'last_name', 'email', 'department', 'profile_picture'],
  });

  return usersPending;
}

const deleteUser = async (user_id: UUID) => {

  const user = await User.findOne({ where: { user_id } });
  const filePath = user.profile_picture;
  filePath && await deleteProfilePicture(filePath);

  await User.destroy({ where: { user_id } });
  return 'Account deleted';
};

const deleteAnUser = async (userDeleteEmail: string) => {

  const user = await User.findOne({ where: { email: userDeleteEmail } });
  const filePath = user.profile_picture;

  filePath && await deleteProfilePicture(filePath);
  await User.destroy({ where: { email: userDeleteEmail } });

  return 'User deleted';
};

const updateUserInfo = async (user_id: UUID, body: any, profile_picture: string) => {
  const { first_name, last_name, email, personal_email, phone, department } = body;
  const updatedUserInfo = await User.update(
    {
      first_name,
      last_name,
      email,
      personal_email,
      phone,
      department,
      profile_picture,
    },
    {
      where: {
        user_id,
      },
    }
  );

  const latestUserData = await getUserInfo(user_id);
  if (!updatedUserInfo) throw new Error('user_id is invalid');
  else {
    return latestUserData;
  }
};

const deleteOldProfilePicture = async (file: any, oldProfilePicture: string) => {
  try {
    const filePath = file.path.split('/').slice(0, -1);
    filePath.push(oldProfilePicture);
    const oldPicturePath = filePath.join('/');
    await deleteProfilePicture(oldProfilePicture)
  } catch (error) {
    console.log({ msg: 'No Old Profile Image found' });
  }
};

const getAllOfTheUsers = async () => {
  const allUsers = await User.findAll({
    where: { role: 'user' },
    attributes: ['role', 'tags', 'first_name', 'last_name', 'email', 'personal_email', 'phone', 'department', 'profile_picture'],
  });
  return allUsers;
};

const deleteProfilePicture = async (fileName: string) => {
  await fs.unlinkSync(`./images/profile_pictures/${fileName}`);
};

const getUserStatsByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  if (user == null) throw new Error('Invalid email');
  const stats = await Stats.findOne({
    where: { user_id: user.user_id },
    attributes: ['passed', 'failed', 'watched', 'not_watched', 'correct_questions', 'wrong_questions']
  });

  const allTutorials = await Tutorial.findAll({ where: {} });
  const allQuestions = await Question.findAll({ where: {} });
  const totalTests = allTutorials.filter((tutorial: any) => tutorial.questions_id[0]);

  const tests_todo = totalTests.length - stats.watched;
  const questions_todo = allQuestions.length - (stats.correct_questions + stats.wrong_questions);
  const to_watch = allTutorials.length - stats.watched;

  return { ...stats.dataValues, tests_todo, questions_todo, to_watch };
};

const getAllStaffStatistics = async () => {

  const allUsers = await User.findAll({ where: { role: 'user' } });

  let questionsRight = 0;
  let questionsWrong = 0;
  let testsPassed = 0;
  let testsFailed = 0;
  let watched = 0;
  let to_watch = 0;

  allUsers.forEach(async (user: UserType) => {
    const userStats = await getUserStatsByEmail(user.email);
    questionsRight += userStats.correct_questions;
    questionsWrong += userStats.wrong_questions;
    testsPassed += userStats.passed;
    testsFailed += userStats.failed;
    watched += userStats.watched;
    to_watch += userStats.to_watch;
  });

  return {
    questionsRight,
    questionsWrong,
    testsPassed,
    testsFailed,
    watched,
    to_watch
  }

};

module.exports = {
  deleteAnUser,
  registerNewUser,
  getUserInfo,
  loginTheUser,
  deleteUser,
  getUsersPending,
  acceptAnUser,
  rejectAnUser,
  getUserByEmail,
  updateUserInfo,
  deleteOldProfilePicture,
  getAllOfTheUsers,
  getUserStatsByEmail,
  getUserByNumber,
  getAllStaffStatistics
};

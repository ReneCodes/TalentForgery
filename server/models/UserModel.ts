import { UUID } from "crypto";
import { registeredUser, loginUser, UserType } from "../types/user";
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const hashAsync = promisify(bcrypt.hash);
const { User, Stats } = require('./Schemas');

const getUserByEmail = async (email: string) => {
  const userExists = User.findOne({ where: { email } });
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
      invited_by: providedInformation.invite,
      user_id,
    });

    await Stats.create({
      user_id,
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
      user_id,
    } = findUser;
    return [
      { role, first_name, last_name, email, personal_email, phone, department },
      user_id,
    ];
  }
};

const acceptAnUser = async (email: string) => {
  const findUser = await User.findOne({ where: { email } });
  if (!findUser) throw new Error("User doesn't exist");
  findUser.role = 'user';
  await findUser.save();
}

const rejectAnUser = async (email: string) => {
  const findUser = await User.findOne({ where: { email } });
  if (!findUser) throw new Error("User doesn't exist");
  return await deleteAnUser(email);
}

const getUserInfo = async (user_id: UUID) => {
  const userInfo = await User.findOne({
    where: { user_id },
    attributes: ['role', 'first_name', 'last_name', 'email', 'personal_email', 'phone', 'department', 'profile_picture'],
  });
  if (!userInfo) throw new Error("user_id is invalid");
  else {
    return userInfo;
  }
};

const getUsersPending = async (): Promise<UserType[]> => {
  const usersPending: UserType[] = await User.findAll({
    where: { role: 'pending' },
    attributes: ['role', 'first_name', 'last_name', 'email', 'department', 'profile_picture', 'invited_by'],
  });

  const allPendingUsers: UserType[] = await Promise.all(
    usersPending.map(async (user) => {
      const invitedByUser = await User.findOne({
        where: { user_id: user.invited_by },
        attributes: ['first_name', 'last_name']
      });

      return {
        ...user,
        invited_by: invitedByUser
      };
    })
  );

  return allPendingUsers;
}

const deleteUser = async (user_id: UUID) => {
  return await User.destroy({ where: { user_id } });
};

const deleteAnUser = async (userDeleteEmail: string) => {
  await User.destroy({ where: { email: userDeleteEmail } });
  return;
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
  getUserByEmail
};

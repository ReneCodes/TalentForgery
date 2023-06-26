const {
  registerNewUser,
  loginTheUser,
  getUserInfo,
} = require('../models/UserModel');

const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

// REGISTERS THE USER
const registerUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, personal_email, password, phone, department, inviteID } = req.body;
  if (!first_name || !last_name || !email || !password || !phone || !department || !inviteID) {
    res.status(400).json('Not enough information provided');
  } else {
    try {
      const data = await registerNewUser({ first_name, last_name, email, personal_email, password, phone, department, inviteID });
      res.status(201).json(data);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage === 'User already exists' || errorMessage === 'Invalid invite') res.status(409).json(errorMessage);
      else res.status(500).json('Server Failed');
    }
  }
};

// LOGINS THE USER AND SETS A TOKEN WITH THE USER ID AND THE EXPIRITY OF 1 MONTH IN THE COOKIES
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) res.status(400).json('Not enough information provided');
  else {
    try {
      const [user_info, user_id] = await loginTheUser({ email, password });
      const token = jwt.sign({ user_id }, process.env.SECRET, { expiresIn: process.env.EXPIRITY_IN_HOURS });
      res.setHeader('Set-Cookie', `session_token=${token}; path=/`);
      res.status(200).json(user_info);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage === 'User dosent exist') res.status(404).json(errorMessage);
      else if (errorMessage === 'Wrong credentials') res.status(422).json(errorMessage);
      else res.status(500).json('Server Failed');
    }
  }

};

// GETS ALL THE INFORMATION FROM A CERTAIN USER
const getUserInformation = async (req: Request, res: Response) => {
  const session_token = req.cookies.session_token;
  if (!session_token) return res.status(422).json('Session token not passed');

  try {
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    if (!user_id) res.status(422).json('user_id not in the token');
    else {
      const data = await getUserInfo(user_id);
      res.status(200).json(data);
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage === 'jwt expired' || errorMessage === 'user_id is invalid') res.status(422).json(errorMessage);
    else res.status(500).json('Server failed');
  }
};

module.exports = {
  registerUser,
  getUserInformation,
  loginUser,
};
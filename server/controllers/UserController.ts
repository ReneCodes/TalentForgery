const { registerNewUser, getUserInfo, loginTheUser } = require('../models/UserModel');
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

// REGISTERS THE USER
const registerUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, personal_email, password, phone, department } = req.body;
  if (!first_name || !last_name || !email || !password || !phone || !department) {
    res.status(400).json('Not enough information provided');
  } else {
    try {
      const data = await registerNewUser({ first_name, last_name, email, personal_email, password, phone, department });
      res.status(201).json(data);
    } catch (error) {
      if ((error as Error).message === 'User already exists') res.status(409).json('User already exists');
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
      if ((error as Error).message === 'User dosent exist') res.status(404).json((error as Error).message);
      else if ((error as Error).message === 'Wrong credentials') res.status(422).json((error as Error).message);
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
    else{
      const data = await getUserInfo(user_id);
      res.status(200).json(data);
    }
  } catch (error) {
    if ((error as Error).message === 'jwt expired') res.status(422).json((error as Error).message);
    else if((error as Error).message === 'user_id is invalid') res.status(422).json((error as Error).message);
    else res.status(500).json('Server failed');
  }
};

module.exports = { registerUser, getUserInformation, loginUser };

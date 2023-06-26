const {
  registerNewUser,
  loginTheUser,
  getUserInfo,
} = require('../models/UserModel');

const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from 'express';

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
  try {
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    const data = await getUserInfo(user_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json('Server failed');
  }
};

const multer = require('multer');
import { fileInput } from '../types/user';

const storage = multer.diskStorage({
  destination: (req: Request, file: File, cb: Function) => {
    cb(null, '../images/profile_pictures');
  },
  filename: (req: Request, file: fileInput, cb: Function) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });


const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);

    await upload.single('profile_picture')(req, res, next);
    res.send('Done');
  } catch (error) {
    console.log(error);
    res.send('Failed')
  }

};

// UPLOADS A TEST IMAGE
const multer = require('multer');
import { fileInput } from '../types/user';

const storage = multer.diskStorage({
  destination: (req: Request, file: File, cb: Function) => {
    cb(null, '../images/profile_pictures');
  },
  filename: (req: Request, file: fileInput, cb: Function) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });


const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);

    await upload.single('profile_picture')(req, res, next);
    res.send('Done');
  } catch (error) {
    console.log(error);
    res.send('Failed')
  }

};

module.exports = {
  registerUser,
  getUserInformation,
  loginUser,
  uploadImage
};

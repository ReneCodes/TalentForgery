const {
  registerNewUser,
  loginTheUser,
  getUserInfo,
  deleteUser,
  deleteAnUser,
  getUsersPending
} = require('../models/UserModel');

const jwt = require('jsonwebtoken');
const multer = require('multer');
import { NextFunction, Request, Response } from 'express';
import { fileInput } from '../types/user';

const storage = multer.diskStorage({
  destination: (req: Request, file: File, cb: Function) => {
    cb(null, '../server/images/profile_pictures');
  },
  filename: (req: Request, file: fileInput, cb: Function) => {
    const customFileName = Date.now() + file.originalname;
    cb(null, Date.now() + customFileName);
  },
});

const upload = multer({ storage });

// REGISTERS THE USER
// req: Request -> req.file will complain if you leave with type
const registerUser = async (req: any, res: Response, next: NextFunction) => {

  await upload.single('profile_image')(req, res, async (err: Error) => {

    if (err) return res.status(500).json('Server failed uploading profile picture');
    const { first_name, last_name, email, personal_email, password, phone, department, inviteID } = req.body;
    if (!first_name || !last_name || !email || !password || !department || !inviteID) {
      return res.status(400).json('Not enough information provided');
    } else {
      try {
        const profile_picture = req.file ? req.file.filename : null;

        const data = await registerNewUser({ first_name, last_name, email, personal_email, password, phone, department, inviteID, profile_picture });
        res.status(201).json(data);
      } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage === 'User already exists' || errorMessage === 'Invalid invite') res.status(409).json(errorMessage);
        else res.status(500).json('Server Failed');
      }
    }
  });

};

// LOGINS THE USER AND SETS A TOKEN WITH THE USER ID AND THE EXPIRITY OF 1 MONTH IN THE COOKIES
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json("Not enough information provided");
  else {
    try {
      const [user_info, user_id] = await loginTheUser({ email, password });
      const token = jwt.sign({ user_id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRITY_IN_HOURS,
      });
      res.setHeader("Set-Cookie", `session_token=${token}; path=/; SameSite=None; Secure`);
      res.status(200).json(user_info);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage === "User doesn't exist") {res.status(404).json(errorMessage);}
      else if (errorMessage === 'Wrong credentials') {res.status(422).json(errorMessage);}
      else {res.status(500).json('Server Failed');}
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

// GETS THE USERS THAT HAVE THE ROLE SET TO PENDING
const getPendingUsers = async (req: Request, res: Response) =>{
  try {
    const data = await getUsersPending();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json('Server failed');
  }
}

// DELETES AN ACCOUNT
const deleteMyAccount = async (req: Request, res: Response) => {
  const session_token = req.cookies.session_token;
  try {
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    const data = await deleteUser(user_id);
    res.status(200).json('Account Deleted');
  } catch (error) {
    res.status(500).json('Server failed');
  }
};

//  DELETES A USER -> ONLY ADMIN
const deleteUserAccount = async (req: Request, res: Response) => {
  const { user_delete } = req.body;
  if (!user_delete) return res.status(400).json('Not enough information provided');
  try {
    await deleteAnUser(user_delete);
    res.status(200).json('User deleted');
  } catch (error) {
    res.status(500).json('Server failed');
  }
};

module.exports = {
  deleteMyAccount,
  registerUser,
  getUserInformation,
  loginUser,
  deleteUserAccount,
  getPendingUsers
};

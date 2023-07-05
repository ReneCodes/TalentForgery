const {
  registerNewUser,
  loginTheUser,
  getUserInfo,
  deleteUser,
  deleteAnUser,
  getUsersPending,
  acceptAnUser,
  rejectAnUser,
  updateUserInfo,
  deleteOldProfilePicture,
  getAllOfTheUsers,
  getUserStatsByEmail
} = require('../models/UserModel');

const jwt = require('jsonwebtoken');
const multer = require('multer');
import { NextFunction, Request, Response } from 'express';
import { fileInput } from '../types/user';
const { validateRegisterData, validateLoginData, validateUserDelete } = require('../middleware/Validation');
const { getUserByEmail } = require('../models/UserModel');
const fs = require('fs');

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

    const informationIsRight = await validateRegisterData(req, res);
    if (err) return res.status(500).json('Server failed uploading profile picture');

    if (!informationIsRight) {
      req.file && req.file.path ? await fs.unlinkSync(req.file.path) : false;
      return res.status(400).json("Not enough information provided");
    }

    const { first_name, last_name, email, personal_email,
      password, phone, department
    } = req.body;

    const userExists = await getUserByEmail(email);
    if (userExists) {
      req.file && req.file.path ? await fs.unlinkSync(req.file.path) : false;
      return res.status(409).json('User already exists');
    };

    try {
      const profile_picture = req.file ? req.file.filename : null;
      const data = await registerNewUser({
        first_name, last_name, email, personal_email, password,
        phone, department, profile_picture
      });
      return res.status(201).json(data);
    } catch (error) {
      res.status(500).json('Server Failed');
    };

  });

};

// LOGINS THE USER AND SETS A TOKEN WITH THE USER ID AND THE EXPIRITY OF 1 MONTH IN THE COOKIES
const loginUser = async (req: Request, res: Response) => {

  const informationIsRight = await validateLoginData(req, res);
  if (!informationIsRight) return res.status(400).json("Not enough information provided");

  try {
    const { email, password } = req.body;
    const [user_info, user_id] = await loginTheUser({ email, password });
    const token = jwt.sign({ user_id }, process.env.SECRET, {
      expiresIn: process.env.EXPIRITY_IN_HOURS,
    });
    res.setHeader("Set-Cookie", `session_token=${token}; path=/; SameSite=None; Secure`);
    res.status(200).json(user_info);
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage === "User doesn't exist") { res.status(404).json(errorMessage); }
    else if (errorMessage === 'Wrong credentials') { res.status(422).json(errorMessage); }
    else { res.status(500).json('Server Failed'); }
  }

};

// ACCEPTS PENDING USER
const acceptUser = async (req: Request, res: Response) => {
  const { email, tags } = req.body;

  if (!email || !tags) return res.status(400).json("Not enough information provided");
  try {
    const data = await acceptAnUser(email, tags);
    res.status(200).json(data);
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage === "User doesn't exist") { res.status(404).json(errorMessage); }
    else res.status(500).json('Server failed');
  }
};

// REJECTS PENDING USER
const rejectUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) return res.status(400).json("Not enough information provided");
  try {
    const data = await rejectAnUser(email);
    res.status(200).json(data);
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage === "User doesn't exist") { res.status(404).json(errorMessage); }
    else res.status(500).json('Server failed');
  }
};

// GETS ALL THE INFORMATION FROM A CERTAIN USER
const getUserInformation = async (req: Request, res: Response) => {
  try {
    const session_token = req.cookies.session_token;
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    const data = await getUserInfo(user_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json('Server failed');
  }
};

// GETS THE USERS THAT HAVE THE ROLE SET TO PENDING
const getPendingUsers = async (req: Request, res: Response) => {
  try {
    const data = await getUsersPending();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json('Server failed');
  }
};

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
  const informationIsRight = await validateUserDelete(req, res);
  if (!informationIsRight) return res.status(400).json("Not enough information provided");

  try {
    const { user_delete } = req.body;
    await deleteAnUser(user_delete);
    res.status(200).json('User deleted');
  } catch (error) {
    res.status(500).json('Server failed');
  };
};

// UPDATE ALL THE INFORMATION FROM A CERTAIN USER
const updateUser = async (req: any, res: Response, next: NextFunction) => {
  await upload.single('profile_picture')(req, res, async (err: Error) => {
    const session_token = req.cookies.session_token;

    try {
      const user_id = jwt.verify(session_token, process.env.SECRET).user_id;

      let currentUserInfo = await getUserInfo(user_id);
      const oldProfilePicture = currentUserInfo.profile_picture;
      // Delete old profile picture if user updates to a new one
      if (req.file && oldProfilePicture) {
        deleteOldProfilePicture(req.file, oldProfilePicture);
      }
      // new path or old path
      const profile_picture = req.file ? req.file.filename : oldProfilePicture;

      const data = await updateUserInfo(user_id, req.body, profile_picture);
      return res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server Failed', error });
    }
  });
}

// UPDATE ALL THE INFORMATION FROM A CERTAIN USER
const logUserOut = async (req: any, res: Response, next: NextFunction) => {
  try {
    const session_token = req.cookies.session_token;
    res.clearCookie('session_token');
    res.status(200).json('User logged out');
  } catch (error) {
    res.status(500).json('Server failed');
  }
};

// GETS ALL OF THE USERS
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const session_token = req.cookies.session_token;
    const data = await getAllOfTheUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json('Server failed');
  }
};

// GETS THE USER STATS
const getUserStats = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json('Not enough information provided');
    const data = await getUserStatsByEmail(email);
    res.status(200).json(data);
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage === 'Invalid email') res.status(404).json(errorMessage);
    else res.status(500).json('Server failed');
  }
};

module.exports = {
  deleteMyAccount,
  registerUser,
  rejectUser,
  acceptUser,
  getUserInformation,
  loginUser,
  deleteUserAccount,
  getPendingUsers,
  updateUser,
  logUserOut,
  getAllUsers,
  getUserStats
};

import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const session_token = req.cookies.session_token;
  if (!session_token) return res.status(422).json('Session token not passed');
  try {
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    if (!user_id) res.status(422).json('user_id not in the token');
    else {
      const findUser = await User.findOne({ where: { user_id } });
      if (!findUser) throw new Error('user_id is invalid');
      else next();
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage === 'jwt expired' || errorMessage === 'user_id is invalid') res.status(422).json(errorMessage);
    else res.status(500).json('Server failed');
  }

};


module.exports = authUser;
export { };

const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

const { getUserInvite } = require('../models/InviteModel');

// GETS THE INVITE FOR A USER IF THERE IS NO INVITE IT CREATES ONE
const getInvite = async (req: Request, res: Response) => {
  const session_token = req.cookies.session_token;
  if (!session_token) return res.status(422).json('Session token not passed');
  try {
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    if (!user_id) res.status(422).json('user_id not in the token');
    else {
      const data = await getUserInvite(user_id);
      res.status(200).json(data);
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage === 'jwt expired' || errorMessage === 'user_id is invalid') res.status(422).json(errorMessage);
    else if (errorMessage === 'unauthorized') res.status(403).json(errorMessage);
    else res.status(500).json('Server failed');
  }
};

module.exports = {
  getInvite
}
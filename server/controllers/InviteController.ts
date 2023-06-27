export { };

const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

const { getUserInvite } = require('../models/InviteModel');

// GETS THE INVITE FOR A USER IF THERE IS NO INVITE IT CREATES ONE
const getInvite = async (req: Request, res: Response) => {
  const session_token = req.cookies.session_token;
  try {
    const user_id = jwt.verify(session_token, process.env.SECRET).user_id;
    const data = await getUserInvite(user_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json('Server failed');
  }
};

module.exports = {
  getInvite
}
const { registerNewUser, getInfo } = require('../models/UserModel');
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const data = await registerNewUser();
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.log('Failed', error);
  }
};

export const getAllInformation = async (req: Request, res: Response) => {
  try {
    const data = await getInfo();
    res.status(200).json(data);
  } catch (error) {
    console.log('Failed', error);
  }
};

module.exports = { registerUser, getAllInformation }
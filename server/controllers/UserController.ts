const { registerNewUser } = require('../models/UserModel');
const { Request, Response } = require('express');

export const registerCompany = (req: Request, res: Response) => {
  try {
    const data = registerNewUser();
  } catch (error) {
    console.log('Failed', error);
  }
};

module.exports = { registerCompany }
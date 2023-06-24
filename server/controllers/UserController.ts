const { registerNewUser, getInfo } = require('../models/UserModel');
const { Request, Response } = require('express');

export const registerUser = async (req: Request, res: Response) => {
  try {
    const data = await registerNewUser();
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(data))

    return data;
  } catch (error) {
    console.log('Failed', error);
  }
};

export const getAllInformation = async (req: Request, res: Response) => {
  try {
    const data = await getInfo();

    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(data))


  } catch (error) {
    console.log('Failed', error);
  }
};

module.exports = { registerUser, getAllInformation }
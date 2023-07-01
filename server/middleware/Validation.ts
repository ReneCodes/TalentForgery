export { };
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateRegisterData = async (req: Request, res: Response) => {
  const validateUserData = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
    body('department').notEmpty().withMessage('Department is required'),
    body('inviteID').notEmpty().withMessage('Invite ID is required'),
  ];

  let allRight = true;
  await Promise.all(validateUserData.map(validator => validator.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      allRight = false;
    }
  });

  return allRight;
};

const validateLoginData = async (req: Request, res: Response) => {
  const validateUserData = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ];

  let allRight = true;
  await Promise.all(validateUserData.map(validator => validator.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      allRight = false;
    }
  });

  return allRight;
};

module.exports = { validateRegisterData, validateLoginData };
export { };
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateRegisterData = async (req: Request, res: Response) => {
  const validateUserData = [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('department').notEmpty(),
    body('inviteID').notEmpty(),
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
    body('email').notEmpty(),
    body('password').notEmpty(),
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

const validateTutorialData = async (req: Request, res: Response) => {
  const validateUserData = [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('question_ids').notEmpty(),
    body('questions_shown').notEmpty(),
    body('access_date').notEmpty(),
    body('due_date').notEmpty(),
    body('tags').notEmpty(),
  ];

  let allRight = true;
  await Promise.all(validateUserData.map(validator => validator.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      allRight = false;
      console.log('Validation errors:', errors.array());
    }
  });

  return allRight;
};

const validateUserDelete = async (req: Request, res: Response) => {
  const validateUserData = [
    body('user_delete').notEmpty(),
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

const validateTutorialId = async (req: Request, res: Response) => {
  const validateUserData = [
    body('tutorial_id').notEmpty(),
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

const validateTestDone = async (req: Request, res: Response) => {
  const validateUserData = [
    body('tutorial_id').notEmpty(),
    body('answers').notEmpty(),
    body('question_ids').notEmpty(),
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


module.exports = {
  validateRegisterData,
  validateLoginData,
  validateTutorialData,
  validateUserDelete,
  validateTutorialId,
  validateTestDone,
};
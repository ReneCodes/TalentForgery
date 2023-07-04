import { createdTutorial } from '../types/tutorial';
const jwt = require('jsonwebtoken');
const { createTheTutorial, getAllTheTutorials, getUserTutorials } = require('../models/TutorialModel');

const { getTutorialQuestions, getTheQuestions } = require('../models/QuestionsModel');
const { validateTutorialData, validateTutorialId } = require('../middleware/Validation');
const fs = require('fs');

import { Request, Response } from 'express';
import { fileInput } from '../types/user';

const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req: Request, file: any, cb: any) => {
		if (file.fieldname === 'video_thumb') {
			cb(null, './images/thumbnails');
		} else {
			cb(null, './videos');
		}
	},
	filename: (req: Request, file: any, cb: any) => {
		const customFileName = Date.now() + file.originalname;
		cb(null, Date.now() + customFileName);
	},
});


const upload = multer({ storage });
async function createTutorial(req: any, res: Response) {
	const sessionToken = req.cookies.session_token;
	const user_id = jwt.verify(sessionToken, process.env.SECRET).user_id;

	await upload.fields([
		{ name: 'video_url', maxCount: 1 },
		{ name: 'video_thumb', maxCount: 1 },
	])(req, res, async (err: Error) => {		
		const informationIsRight = await validateTutorialData(req, res);
		if (!informationIsRight) {
			req.file && req.file.path ? await fs.unlinkSync(req.file.path) : false;
			return res.status(400).json('Not enough information provided');
		}

		const { title, description, question_ids, questions_shown, access_date, due_date, tags }: createdTutorial = req.body;
		if (err) return res.status(500).json('Server failed uploading tutorial');

		try {
			const videoFileName = req.files ? req.files.video_url[0].filename : 'no_file';
			const thumbFileName = req.files ? req.files.video_thumb[0].filename : 'no_file';

			const tutorialData = {
				title,
				video_url: videoFileName,
				video_thumb: thumbFileName,
				description,
				question_ids,
				questions_shown,
				access_date,
				due_date,
				tags,
			};

			tutorialData.video_url = videoFileName;
			const [tutorial_id, questions_id] = await createTheTutorial(tutorialData, user_id);
			res.status(201).json({ message: 'Tutorial created.', tutorial_id, questions_id });
		} catch (error) {
			const errorMessage = (error as Error).message;
			console.log(errorMessage);

			res.status(500).json('Failed to create tutorial.');
		}
	});
}

async function getAllTutorials(req: Request, res: Response) {
	try {
		const tutorials = await getAllTheTutorials();
		res.status(200).json(tutorials);
	} catch (error) {
		res.status(500).json('Failed to retrieve tutorial');
	}
}

async function getTutorials(req: Request, res: Response) {
	try {
		const sessionToken = req.cookies.session_token;
		const user_id = jwt.verify(sessionToken, process.env.SECRET).user_id;
		const tutorials = await getUserTutorials(user_id);
		res.status(200).json(tutorials);
	} catch (error) {
		console.log((error as Error).message);
		res.status(500).json('Failed to retrieve tutorial');
	}
}

async function getQuestions(req: Request, res: Response) {
	const informationIsRight = await validateTutorialId(req, res);
	if (!informationIsRight) return res.status(400).json('Not enough information provided');

	try {
		const { tutorial_id } = req.body;
		const questions = await getTutorialQuestions(tutorial_id);
		res.status(200).json(questions);
	} catch (error) {
		const errorMessage = (error as Error).message;
		console.log(errorMessage);

		if (errorMessage === 'Invalid tutorial id') {
			res.status(404).json(errorMessage);
		} else res.status(500).json('Server failed');
	}
}

async function getAllQuestions(req: Request, res: Response) {
	try {
		const questions = await getTheQuestions();
		res.status(200).json(questions);
	} catch (error) {
		res.status(500).json('Server failed');
	}
}

module.exports = { createTutorial, getAllTutorials, getQuestions, getAllQuestions, getTutorials };

import {SyntheticEvent} from 'react';
import {Button, Card, FormControl, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {useEffect, useState} from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {sendFinishedTest} from '../../../services/Api.service';

interface TestQuestionComp {
	question: {
		question: string;
		options: string[];
		answer: string;
		question_id: string;
	};
}

// interface QuizzListProps {
// 	setQuizzDone: React.Dispatch<React.SetStateAction<boolean>>;
// 	setQuizzToDo: React.Dispatch<React.SetStateAction<boolean>>;
// }

type QuizzAnswer = {
	tutorial_id: string;
	answers: string[];
	question_ids: number[];
};

const TimedQuizzList: React.FC<any> = ({setQuizzDone, setQuizzToDo, tutorialQuestions, videoData}) => {
	const [questions, setQuestions] = useState<TestQuestionComp[]>([]);
	const [userAnswer, setUserAnswer] = useState<string[]>([]);
	const [index, setIndex] = useState(0);
	const tempAnswer = new Array(1);

	const {tutorial_id, questions_id} = videoData;

	useEffect(() => {
		setQuestions(tutorialQuestions);
	}, []);

	const handleAnswer = (e: SyntheticEvent<Element, Event>) => {
		const target = e.target as HTMLInputElement;
		tempAnswer[0] = target.value as string;
	};

	const nextQuestion = () => {
		if (tempAnswer[0]) {
			setIndex(index + 1);
			setUserAnswer([...userAnswer, tempAnswer[0]]);
			if (index === questions.length - 1) handleQuizzDone();
		}
	};

	const handleQuizzDone = async () => {
		if (userAnswer.length !== 0) {
			const quizzAnswersBody: QuizzAnswer = {
				tutorial_id,
				answers: userAnswer,
				question_ids: questions_id,
			};
			sendFinishedTest(quizzAnswersBody);

			setQuizzToDo(false);
			setQuizzDone(true);
		}
	};

	return (
		<Card sx={styles.checklist_box}>
			<h2>{questions[index]?.question.question}</h2>
			<FormControl>
				<RadioGroup>
					{questions[index]?.question.options.map((option) => (
						<FormControlLabel
							key={option}
							value={option}
							label={option}
							control={<Radio />}
							name="optionGroup"
							onChange={handleAnswer}
						/>
					))}
				</RadioGroup>
			</FormControl>
			{index === questions.length - 1 ? (
				<Button
					sx={styles.btn_done}
					variant="contained"
					onClick={nextQuestion}
					endIcon={<AssignmentTurnedInIcon />}>
					Finish Quiz
				</Button>
			) : (
				<Button
					sx={styles.btn_next}
					variant="contained"
					onClick={nextQuestion}
					endIcon={<ArrowForwardIosIcon />}>
					Next
				</Button>
			)}
		</Card>
	);
};

export default TimedQuizzList;

/** @type {import("@mui/material").SxProps} */
const styles = {
	checklist_box: {
		display: 'flex',
		flexDirection: 'column',
		gap: '10px',
		justifyContent: 'space-between',
		mx: 3,
		width: {xs: '100%', sm: '500px', md: '600px'},
		minWidth: '300px',
		height: '100%',
		minHeight: '400px',
		p: 3,
	},
	btn_next: {
		backgroundColor: 'secondary.main',
		color: 'gray.900',
		':hover': {
			backgroundColor: 'secondary.900',
		},
	},
	btn_done: {
		backgroundColor: 'green.800',
		color: 'white.main',
		':hover': {
			backgroundColor: 'green.900',
		},
	},
};

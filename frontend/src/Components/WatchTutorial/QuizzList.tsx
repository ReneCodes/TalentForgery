import {SyntheticEvent} from 'react';
import {Button, Card, FormControl, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {useEffect, useState} from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import theme from '../../config/theme';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

interface TestQuestionComp {
	id: number;
	question: string;
	options: string[];
	answer: string;
	choice?: string;
}

const mockQuestions: TestQuestionComp[] = [
	{
		id: 3,
		question: 'At which location can we be sure that they have plenty bananas?',
		options: ['Detroit', 'Michigan', 'Orlando'],
		answer: 'Detroit',
	},
	{
		id: 4,
		question: 'Ham or Cheese?',
		options: ['Ham', 'Cheese'],
		answer: 'Cheese',
	},
	{
		id: 5,
		question: 'Whats the best drink?',
		options: ['Vodka', 'Beer', 'Cider'],
		answer: 'Cider',
	},
];

const mockLength = 2;

interface QuizzListProps {
	setQuizzDone: React.Dispatch<React.SetStateAction<boolean>>;
	setQuizzToDo: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizzList: React.FC<QuizzListProps> = ({setQuizzDone, setQuizzToDo}) => {
	const [index, setIndex] = useState(0);
	const [questions, setQuestions] = useState<TestQuestionComp[]>([]);

	useEffect(() => {
		setQuestions(randomizeArray(mockQuestions, mockLength));
	}, []);

	const randomizeArray = (arr: TestQuestionComp[], length: number) => {
		if (arr.length <= length) return arr;

		while (arr.length > length) {
			const randIndex = Math.floor(Math.random() * arr.length);
			arr.splice(randIndex, 1);
		}

		arr.sort(() => Math.random() - 0.5);

		return arr;
	}

	const handleAnswer = (e: SyntheticEvent<Element, Event>) => {
		const target = e.target as HTMLInputElement;
		questions[index].choice = target.value as string;
	};

	useEffect(() => {
		if (index === questions.length && questions.length !== 0) {
			const ids = [];
			const choices = [];
			for (const question of questions) {
				ids.push(question.id);
				choices.push(question.choice);
			}
		}
	}, [index]);

	const handleQuizzDone = () => {
		// setIndex(index + 1);
		if (index === questions.length - 1 && questions.length !== 0) {
			const ids = [];
			const choices = [];
			for (const question of questions) {
				ids.push(question.id);
				choices.push(question.choice);
			}

			setQuizzToDo(false);
			setQuizzDone(true);
		}
	};

	return (
		<Card sx={styles.checklist_box}>
			<h2>{questions[index]?.question}</h2>
			<FormControl>
				<RadioGroup>
					{questions[index]?.options.map((option) => (
						<FormControlLabel
							key={option}
							value={option}
							label={option}
							control={<Radio className='checkbox' />}
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
					onClick={handleQuizzDone}
					endIcon={<AssignmentTurnedInIcon />}>
					Finish Quiz
				</Button>
			) : (
				<Button
					sx={styles.btn_next}
					variant="contained"
					onClick={() => setIndex(index + 1)}
					endIcon={<ArrowForwardIosIcon />}>
					Next
				</Button>
			)}
		</Card>
	);
};

export default QuizzList;

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
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.gray[900],
		':hover': {
			backgroundColor: theme.palette.secondary[900],
		},
	},
	btn_done: {
		backgroundColor: theme.palette.green[800],
		color: theme.palette.gray[900],
		':hover': {
			backgroundColor: theme.palette.green[900],
		},
	},
};

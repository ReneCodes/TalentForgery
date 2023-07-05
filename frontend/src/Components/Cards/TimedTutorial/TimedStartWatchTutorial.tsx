import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import {Box, Card, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
// Components / Types
import TimedTotorialVideo from './TimedTotorialVideo';
import TimedQuizzList from './TimedQuizzList';
import {SmallVideoData} from '../../../@types/Types';
// icons
import CloseIcon from '@mui/icons-material/Close';
import {YellowTooltip} from '../../Tooltips/CustomTooltips';

// Dialog Visual Transistion
const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return (
		<Slide
			direction="up"
			ref={ref}
			{...props}
		/>
	);
});

interface TutorialQuestions {
	question: {
		question: string;
		options: string[];
		answer: string;
		question_id: string;
	};
}

interface TimedWatchTutorialProps {
	videoData: SmallVideoData['videoData'];
	tutorialQuestions: TutorialQuestions[];
	accessTime: string | undefined;
	accessDate: string | undefined;
	currentDateInMs: number | undefined;
	accessDateInMs: number | undefined;
	createCurrentDate: () => void;
}

const TimedStartWatchTutorial: React.FC<TimedWatchTutorialProps> = ({
	videoData,
	tutorialQuestions,
	accessDate,
	accessTime,
	currentDateInMs,
	accessDateInMs,
	createCurrentDate,
}) => {
	// local States
	const [open, setOpen] = React.useState(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [videoToWatch, setVideoToWatch] = React.useState(true);
	const [quizzToDo, setQuizzToDo] = React.useState(false);
	const [quizzDone, setQuizzDone] = React.useState(false);

	const handleClickOpen = async () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAlertOpen = () => {
		setOpenAlert(true);
	};
	const handleAlertClose = () => {
		setOpenAlert(false);
	};
	const handleAbortTutorial = () => {
		console.log('User Aborted Tutorial');
		handleClose();
		setOpenAlert(false);
	};

	// console.log('new render');
	// console.log('currentDateTime', currentDateTime);
	// console.log('accessDate', accessDate);
	// console.log('accessTime', accessTime);

	return (
		<div>
			{accessDateInMs && currentDateInMs && accessDateInMs <= currentDateInMs ? (
				<Button
					variant="contained"
					sx={styles.access_btn}
					aria-label="Start Tutorial"
					onClick={handleClickOpen}>
					Start Tutorial
				</Button>
			) : (
				<YellowTooltip
					title="Click to Check Time"
					placement="bottom"
					describeChild
					arrow>
					<Button
						variant="contained"
						aria-label="no access yet"
						sx={styles.access_denied_btn}
						onClick={createCurrentDate}>
						<Typography>{`Unlocked at`}</Typography>
						<Typography>{`${accessDate} ${accessTime}`}</Typography>
					</Button>
				</YellowTooltip>
			)}
			{/* <Typography>{currentDateTime}</Typography> */}
			<Dialog
				fullScreen
				open={open}
				onClose={handleAlertOpen}
				TransitionComponent={Transition}>
				<AppBar sx={{position: 'relative', backgroundColor: 'primary.main'}}>
					<Toolbar>
						<Typography
							sx={{ml: 2, flex: 1, fontWeight: 'bold', fontSize: '32px'}}
							variant="h6"
							component="div">
							{videoData.title}
						</Typography>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleAlertOpen}
							aria-label="close">
							<CloseIcon />
						</IconButton>
						<Dialog
							open={openAlert}
							onClose={handleAlertClose}
							aria-labelledby="abort-tutorial"
							aria-describedby="alert-dialog-description">
							<DialogTitle id="abort-tutorial">Alert Aborting Tutorial</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									You are about to about the ufinished tutorial and will lose all progress.
								</DialogContentText>
								<DialogContentText>Are you sure you want to abort tutorial?</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button
									variant="outlined"
									onClick={handleAlertClose}
									sx={{
										fontWeight: 'bold',
										borderColor: 'green.main',
										color: 'green.900',
										':hover': {
											backgroundColor: 'green.900',
											borderColor: 'green.900',
											color: 'white.main',
										},
									}}>
									Continue Watching
								</Button>
								<Button
									variant="outlined"
									onClick={handleAbortTutorial}
									autoFocus
									sx={{
										fontWeight: 'bold',
										borderColor: 'red.main',
										color: 'red.900',
										':hover': {
											backgroundColor: 'red.900',
											borderColor: 'red.900',
											color: 'white.main',
										},
									}}>
									Abort Tutorial
								</Button>
							</DialogActions>
						</Dialog>
					</Toolbar>
				</AppBar>
				{videoToWatch && (
					<TimedTotorialVideo
						videoData={videoData}
						setVideoToWatch={setVideoToWatch}
						setQuizzToDo={setQuizzToDo}
					/>
				)}
				{quizzToDo && (
					<Box sx={{display: 'flex', justifyContent: 'center', mx: 'auto', mt: '100px'}}>
						<TimedQuizzList
							setQuizzDone={setQuizzDone}
							setQuizzToDo={setQuizzToDo}
							tutorialQuestions={tutorialQuestions}
							videoData={videoData}
						/>
					</Box>
				)}
				{quizzDone && (
					<Box sx={{display: 'flex', justifyContent: 'center', mx: 'auto', mt: '100px'}}>
						<Card sx={styles.quizz_done}>
							<Typography variant="h2">Thank you!</Typography>
							<Typography variant="overline">Your quizz has been send to get analysed</Typography>
							<Typography variant="overline">You will get the result in no time.</Typography>
							<Button
								variant="contained"
								sx={{
									backgroundColor: 'secondary.main',
									color: 'gray.900',
									py: 1,
									px: 3,
									':hover': {
										backgroundColor: 'secondary.900',
									},
								}}
								onClick={handleClose}
								autoFocus>
								Done
							</Button>
						</Card>
					</Box>
				)}
			</Dialog>
		</div>
	);
};
export default TimedStartWatchTutorial;

/** @type {import("@mui/material").SxProps} */
const styles = {
	quizz_done: {
		display: 'flex',
		flexDirection: 'column',
		gap: 2,
		justifyContent: 'center',
		textAlign: 'center',
		mx: 3,
		width: {xs: '100%', sm: '500px', md: '600px'},
		minWidth: '300px',
		height: '100%',
		minHeight: '400px',
		p: 3,
	},
	access_btn: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'white.main',
		color: 'gray.900',
		':hover': {
			backgroundColor: 'secondary.main',
		},
	},
	access_denied_btn: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'gray.900',
		color: 'white.main',
		':hover': {
			backgroundColor: 'red.900',
		},
	},
};

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import theme from '../../config/theme';
// icons
import CloseIcon from '@mui/icons-material/Close';
import {Box, Card, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import QuizzList from './QuizzList';
import TotorialVideo from './TotorialVideo';
import {TutorialVideoDataType} from '../../@types/Types';

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

interface WatchTutorialProps {
	videoData: TutorialVideoDataType;
}

const WatchTutorial: React.FC<WatchTutorialProps> = ({videoData}) => {
	const {primary, white, red, green, secondary, gray} = theme.palette;
	const [open, setOpen] = React.useState(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [videoToWatch, setVideoToWatch] = React.useState(true);
	const [quizzToDo, setQuizzToDo] = React.useState(false);
	const [quizzDone, setQuizzDone] = React.useState(false);

	const handleClickOpen = () => {
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

	return (
		<div>
			<Button
				variant="outlined"
				onClick={handleClickOpen}>
				Open full-screen dialog
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<AppBar sx={{position: 'relative', backgroundColor: primary.main}}>
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
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description">
							<DialogTitle id="alert-dialog-title">Aborting Tutorial</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									You are about to about the ufinished tutorial and will lose all progress.
								</DialogContentText>
								<DialogContentText id="alert-dialog-description">
									Are you sure you want to abort tutorial?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button
									variant="outlined"
									onClick={handleAlertClose}
									sx={{
										fontWeight: 'bold',
										borderColor: green.main,
										color: green[900],
										':hover': {
											backgroundColor: green[900],
											borderColor: green[900],
											color: white.main,
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
										borderColor: red.main,
										color: red[900],
										':hover': {
											backgroundColor: red[900],
											borderColor: red[900],
											color: white.main,
										},
									}}>
									Abort Tutorial
								</Button>
							</DialogActions>
						</Dialog>
					</Toolbar>
				</AppBar>
				{videoToWatch && (
					<TotorialVideo
						videoData={videoData}
						setVideoToWatch={setVideoToWatch}
						setQuizzToDo={setQuizzToDo}
					/>
				)}
				{quizzToDo && (
					<Box sx={{display: 'flex', justifyContent: 'center', mx: 'auto', mt: '100px'}}>
						<QuizzList
							setQuizzDone={setQuizzDone}
							setQuizzToDo={setQuizzToDo}
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
									backgroundColor: secondary.main,
									color: gray[900],
									py: 1,
									px: 3,
									':hover': {
										backgroundColor: secondary[900],
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
export default WatchTutorial;

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
};

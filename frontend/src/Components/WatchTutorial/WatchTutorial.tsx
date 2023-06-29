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
import {Box, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

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

const videoData = {
	title: 'How to peel a Banana',
	source: '/src/assets/Temp_assets/chemist13s.mp4',
	thumbnail: '/src/assets/Temp_assets/chemist_thumb.png',
	description: ` "Hey there! In this quick tutorial, I'll show you how to peel a banana in just a few simple steps. First, hold the banana. Next, gently peel the skin. Keep peeling. And voila! Let's get started!"`,
	topic: 'science',
	watched: false,
	has_form: true,
	from_done: false,
};

export default function WatchTutorial() {
	const {primary, secondary, white, red, green, gray} = theme.palette;
	const [open, setOpen] = React.useState(false);
	const [openAlert, setOpenAlert] = React.useState(false);

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
				<Box sx={{maxWidth: '95%', margin: 'auto'}}>
					<DialogContent sx={{width: 'fit-content', maxWidth: '1000px', margin: 'auto', textAlign: 'center'}}>
						<Box sx={{overflow: 'hidden', m: 2}}>
							<video
								width="100%"
								height="auto"
								muted={false}
								style={{borderRadius: '10px'}}
								controls
								className="watchTutorial_video">
								<source
									src={videoData.source}
									type="video/mp4"></source>
								Your Browser does not support this video tag
							</video>
						</Box>
						<Box>
							<Typography variant="overline">{videoData.description}</Typography>
						</Box>
						<DialogActions>
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
								onClick={() => console.log('get me to the questions')}
								autoFocus>
								Answer Questions
							</Button>
						</DialogActions>
					</DialogContent>
				</Box>
			</Dialog>
		</div>
	);
}

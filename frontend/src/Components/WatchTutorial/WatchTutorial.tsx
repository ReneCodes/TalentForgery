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
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import QuizzList from '../Tests/QuizzList';
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
	const {primary, white, red, green} = theme.palette;
	const [open, setOpen] = React.useState(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [videoWatched, setVideoWatched] = React.useState(false);
	console.log('videoData', videoData);

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
				{videoWatched ? (
					<QuizzList />
				) : (
					<TotorialVideo
						videoData={videoData}
						setVideoWatched={setVideoWatched}
					/>
				)}
			</Dialog>
		</div>
	);
};
export default WatchTutorial;

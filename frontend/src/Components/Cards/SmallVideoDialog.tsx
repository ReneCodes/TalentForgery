import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, DialogContentText} from '@mui/material';
import {TutorialStore, userProfileStore} from '../../utils/zustand.store';
import {SmallVideoData} from '../../@types/Types';
import {getAllTutorials, getUsersTutorials} from '../../services/Api.service';
import {useNavigate} from 'react-router-dom';

type VideoDialogT = {
	dialogOpen: boolean;
	markAsDone: () => void;
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SmallVideoDialog({
	setDialogOpen,
	dialogOpen,
	markAsDone,
	videoData,
}: VideoDialogT & SmallVideoData) {
	// ZUSTAND Store
	const {video_base_url, storeUserTutorials, storeAllTutorials} = TutorialStore();
	const {getUserRole} = userProfileStore();
	const navigate = useNavigate();

	const videoSrc = `${video_base_url}${videoData.video_url}`;

	const handleFinishVideo = async () => {
		const role = getUserRole();
		await getUsersTutorials(storeUserTutorials);
		if (role === 'admin') {
			await getAllTutorials(storeAllTutorials);
		}

		setDialogOpen(false);
		markAsDone();
		navigate('/');
	};

	return (
		<Dialog
			fullWidth={true}
			maxWidth="md"
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			aria-labelledby={`video ${videoData.title}`}
			sx={{textAlign: 'center'}}>
			<DialogTitle
				id={'videoTitle'}
				sx={{fontSize: '24px', fontWeight: 'bold'}}>
				{videoData.title}
			</DialogTitle>
			<Box sx={{maxWidth: '95%', margin: 'auto'}}>
				<DialogContent sx={{width: 'fit-content', py: 0}}>
					<video
						width="100%"
						height="auto"
						muted={false}
						controls>
						<source
							src={videoSrc}
							type="video/mp4"></source>
						Your Browser does not support this video tag
					</video>
					<DialogContentText
						variant="overline"
						sx={{textAlign: 'center'}}>
						{videoData.description}
					</DialogContentText>
				</DialogContent>
			</Box>
			<DialogActions>
				<Button
					onClick={handleFinishVideo}
					autoFocus
					sx={styles.finish_btn}>
					Finish Tutorial
				</Button>
				<Button
					onClick={() => setDialogOpen(false)}
					autoFocus
					sx={styles.not_yet}>
					Not Done Yet
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const styles = {
	finish_btn: {
		mr: 3,
		backgroundColor: 'green.800',
		border: '2px solid',
		borderColor: 'green.800',
		color: 'white.main',
		':hover': {
			backgroundColor: 'white.main',
			color: 'green.800',
		},
	},
	not_yet: {
		backgroundColor: 'gray.700',
		border: '2px solid',
		borderColor: 'gray.700',
		color: 'white.main',
		':hover': {
			backgroundColor: 'gray.900',
		},
	},
};

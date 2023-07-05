import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, DialogContentText} from '@mui/material';
import {TutorialStore} from '../../utils/zustand.store';
import theme from '../../config/theme';
import {SmallVideoData} from '../../@types/Types';

type VideoDialogT = {
	dialogOpen: boolean;
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SmallVideoDialog({setDialogOpen, dialogOpen, videoData}: VideoDialogT & SmallVideoData) {
	// Color Theme
	const {gray, white} = theme.palette;
	const {video_base_url} = TutorialStore();
	const videoSrc = `${video_base_url}${videoData.video_url}`;
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
					onClick={() => setDialogOpen(false)}
					autoFocus
					sx={{
						backgroundColor: gray[700],
						color: white.main,
						':hover': {
							backgroundColor: gray[900],
						},
					}}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

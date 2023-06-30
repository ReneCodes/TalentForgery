import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Box} from '@mui/material';

type VideoDialogT = {
	dialogOpen: boolean;
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	videoData: {
		title: string;
		source: string;
		thumbnail?: string;
		description: string;
		topic: string;
		watched: boolean;
		has_form: boolean;
		from_done: boolean;
	};
};

export default function VideoDialog({setDialogOpen, dialogOpen, videoData}: VideoDialogT) {
	return (
		<Dialog
			fullWidth={true}
			maxWidth="md"
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			aria-labelledby={`video ${videoData.title}`}>
			<DialogTitle id={'videoTitle'}>{videoData.title}</DialogTitle>
			<Box sx={{maxWidth: '95%', margin: 'auto'}}>
				<DialogContent sx={{width: 'fit-content'}}>
					<video
						width="100%"
						height="auto"
						muted={false}
						controls>
						<source
							src={videoData.source}
							type="video/mp4"></source>
						Your Browser does not support this video tag
					</video>
				</DialogContent>
			</Box>
			<DialogActions>
				<Button
					onClick={() => setDialogOpen(false)}
					autoFocus>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

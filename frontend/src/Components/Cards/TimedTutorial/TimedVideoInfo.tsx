import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
// types

// TODO: get the TS Prop Type right
const TimedVideoInfo: React.FC<any> = ({videoData}) => {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const {title, description} = videoData;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="text"
				size="small"
				onClick={handleClickOpen}>
				Details
			</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title">
				<DialogTitle
					id="responsive-dialog-title"
					variant="h4">
					{title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>{description}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						aria-label="close"
						onClick={handleClose}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default TimedVideoInfo;

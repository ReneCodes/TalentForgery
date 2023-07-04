import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../../config/theme';
// types
import {SmallVideoData} from '../../@types/Types';

export default function SmallVideoInfo({videoData}: SmallVideoData) {
	// Color Theme
	const [open, setOpen] = React.useState(false);
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
				aria-labelledby="tutorial details"
				sx={{textAlign: 'center'}}>
				<DialogTitle
					id="tutorial details"
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
						onClick={handleClose}
						sx={{
							backgroundColor: 'gray.700',
							color: 'white.main',
							':hover': {
								backgroundColor: 'gray.900',
							},
						}}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

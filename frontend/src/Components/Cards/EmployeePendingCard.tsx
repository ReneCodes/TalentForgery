import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Avatar, Box, Typography} from '@mui/material';
import ContactInfo from '../ContactInfo/ContactInfo';
import theme from '../../config/theme';

export default function EmployeePendingCard() {
	const [open, setOpen] = React.useState(false);

	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const contactInfo = {
		firstName: 'Bob',
		lastName: 'Bob',
		id: 23456789,
		department: 'Finanace',
		email: 'Bob@mail.com',
		secondEmail: 'Bob@mail.com',
		phoneNumber: '0 500 555 555',
	};

	return (
		<div>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
				sx={{width: '100%', maxWidth: '300px', textAlign: 'left'}}>
				{
					<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
						<Box>
							<Typography>BoB Jones</Typography>
							<Typography variant="caption">Status - </Typography>
							<Typography variant="overline">Pending</Typography>
						</Box>

						<Avatar />
					</Box>
				}
			</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title">
				<DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
				<DialogContent>
					<DialogContentText>{<ContactInfo info={contactInfo} />}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={handleClose}>
						Disagree
					</Button>
					<Button
						onClick={handleClose}
						autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

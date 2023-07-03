import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Avatar, Box, Typography} from '@mui/material';
import theme from '../../config/theme';
import {userProfileStore} from '../../utils/zustand.store';
import EmployeePendingInfo from './EmployeePendingInfo';

export default function EmployeePendingCard() {
	const [open, setOpen] = React.useState(false);
	// Zustand Store
	const {avatar_url_path, localProfileInfo} = userProfileStore();
	// Profile Info
	const {first_name, last_name, email, personal_email, phone, department, profile_picture} = localProfileInfo;
	const localProfileAvatar = `${avatar_url_path}/${profile_picture}`;
	// Theme
	const {gray, white, primary} = theme.palette;

	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
				sx={styles.pending_btn}>
				{
					<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
						<Box sx={{color: gray[900]}}>
							<Typography>
								{first_name} {last_name}
							</Typography>
							<Typography variant="caption">Status - Pending </Typography>
						</Box>

						<Avatar
							sx={{border: '2px solid', borderColor: primary.main, width: '50px', height: '50px'}}
							alt="profile image"
							src={profile_picture ? localProfileAvatar : '../src/assets/default_user.png'}></Avatar>
					</Box>
				}
			</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title">
				<DialogTitle
					id="responsive-dialog-title"
					sx={{textAlign: 'center'}}>
					{
						<Typography
							variant="overline"
							sx={{fontSize: '24px'}}>
							Pending User
						</Typography>
					}
				</DialogTitle>
				<DialogContent>{<EmployeePendingInfo />}</DialogContent>
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

/** @type {import("@mui/material").SxProps} */
const styles = {
	pending_btn: {
		width: '100%',
		maxWidth: '300px',
		p: 2,
		textAlign: 'left',
		boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
		overflow: 'hidden',
		border: '1px solid',
		borderColor: '#fff',
		':hover': {
			// backgroundColor: 'white.main',
			backgroundColor: 'secondary.main',
			borderColor: 'secondary.main',
		},
	},
};

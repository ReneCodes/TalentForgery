import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import theme from '../../config/theme';
import { PendingUserStore, TutorialTagStore, userProfileStore } from '../../utils/zustand.store';
import EmployeePendingInfo from './EmployeePendingInfo';
import CloseIcon from '@mui/icons-material/Close';
import { acceptUser, rejectUser } from '../../services/Api.service';

export default function EmployeePendingCard({ user }: any) {
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState('');

	// Zustand Store
	const { avatar_url_path } = userProfileStore();
	const { pendingPerson, filterPendingPeople } = PendingUserStore();
	const { selctedTags, storeSelectedTags } = TutorialTagStore();

	// Destructuring User
	const { dataValues, invited_by } = user;
	const pendingUser = dataValues;
	const { first_name, last_name, profile_picture, email } = pendingUser;

	// Theme
	const { gray, white, primary, secondary, red } = theme.palette;

	const localProfileAvatar = `${avatar_url_path}${profile_picture}`;
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAccept = async () => {
		// console.log('Accept', email, filterPendingPeople, acceptUser);
		// const tags = ['hello', 'world'];
		if (selctedTags.length > 0) {
			await acceptUser(email, selctedTags, filterPendingPeople);
		}
		setError('Select at least on tag');
	};
	const handleReject = async () => {
		storeSelectedTags([]);
		await rejectUser(email, filterPendingPeople);
	};

	// TODO: Delete for production
	// React.useEffect(() => {
	// 	console.log('UseEffect PENDING', pendingPerson);
	// }, [pendingPerson]);

	return (
		<div>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
				sx={styles.pending_btn}>
				{
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
						<Box sx={{ color: gray[900] }}>
							<Typography variant="h6">
								{first_name} {last_name}
							</Typography>
							<Typography
								variant="caption"
								sx={{ fontSize: '12px', color: gray[700] }}>
								Invited By: {invited_by.first_name}{' '}
							</Typography>
						</Box>

						<Avatar
							sx={{
								border: '2px solid',
								borderColor: primary.main,
								backgroundColor: white.main,
								width: '50px',
								height: '50px',
							}}
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
				<Box sx={{ position: 'relative' }}>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
						sx={{
							width: '50px',
							height: '50px',
							m: 2,
							position: 'absolute',
							top: 0,
							right: 0,
							backgroundColor: secondary.main,
							':hover': {
								backgroundColor: gray[900],
								color: secondary.main,
							},
						}}>
						<CloseIcon />
					</IconButton>
				</Box>
				<DialogTitle
					id="responsive-dialog-title"
					sx={{ textAlign: 'center' }}>
					{
						<Typography
							variant="overline"
							sx={{ fontSize: '24px' }}>
							Pending User
						</Typography>
					}
				</DialogTitle>
				<DialogContent>{<EmployeePendingInfo user={user} />}</DialogContent>
				<DialogActions sx={{ borderTop: '1px solid' }}>
					<Typography sx={{ color: red[900], mr: 3 }}>{error}</Typography>
					<Button
						variant="outlined"
						autoFocus
						onClick={handleReject}
						sx={styles.reject}>
						Reject
					</Button>
					<Button
						variant="outlined"
						onClick={handleAccept}
						autoFocus
						sx={styles.accept}>
						Accept
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
	accept: {
		border: '2px solid',
		borderColor: theme.palette.green[800],
		color: theme.palette.green[800],
		fontWeight: 'bold',
		':hover': {
			border: '2px solid',
			borderColor: theme.palette.green[800],
			backgroundColor: theme.palette.green[800],
			color: theme.palette.white.main,
		},
	},
	reject: {
		border: '2px solid',
		borderColor: theme.palette.red[900],
		color: theme.palette.red[900],
		fontWeight: 'bold',
		':hover': {
			border: '2px solid',
			borderColor: theme.palette.red[900],
			backgroundColor: theme.palette.red[900],
			color: theme.palette.white.main,
		},
	},
};

import { Container, Box, Button, Typography, Dialog, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { getAdminInvite, acceptUser, rejectUser } from '../services/Api.service';
import { PendingUserStore, TutorialTagStore } from '../utils/zustand.store';
import UserCard from "../Components/UserCard/UserCard";
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../config/theme';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EmployeePendingInfo from '../Components/Cards/EmployeePendingInfo';
import { PendingPerson } from '../@types/Types';

const Dashboard = () => {
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const [open, setOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const { selctedTags, storeSelectedTags } = TutorialTagStore();

	const [user, setUser] = useState<any>({});


	const { pendingPerson, filterPendingPeople } = PendingUserStore();
	const { gray, white, primary, secondary, red } = theme.palette;

	const handleClickOpen = (user: PendingPerson) => {
		setUser(user);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAccept = async () => {
		if (selctedTags.length > 0) {
			await acceptUser(user.dataValues.email, selctedTags, filterPendingPeople);
			handleClose();
		}
		setError('Select at least on tag');
	};

	const handleReject = async () => {
		storeSelectedTags([]);
		await rejectUser(user.dataValues.email, filterPendingPeople);
		handleClose();
	};


	return (

		<Container
			sx={{
				minHeight: '100%',
				height: 'max-content',
				width: '100%',
				display: 'flex',
				gap: 4,
				flexDirection: 'column',
				justifyContent: 'start',
				position: 'relative'
			}}>


			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
				{pendingPerson[0] ?
					<Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
							<Typography variant="h5">Total Pending Users: {pendingPerson.length}</Typography>
						</Box>
						{pendingPerson.map((user) => (
							<Box key={user.dataValues.profile_picture}>
								<UserCard first_name={user.dataValues.first_name} last_name={user.dataValues.last_name}
									email={'Invited by: ' + user.invited_by.first_name} profile_picture={user.dataValues.profile_picture}
									callback={() => handleClickOpen(user)}
								/>
							</Box>
						))}
					</Box> :
					<Box sx={{ position: 'absolute' }}>
						<Typography variant='h4'>
							You have no users pending
						</Typography>
					</Box>
				}
			</Box>


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
						onClick={() => handleReject()}
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


		</Container >
	);
};

export default Dashboard;

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

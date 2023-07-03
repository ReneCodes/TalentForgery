import {FC} from 'react';
import {Container, Typography, Box, Paper, Divider, Stack, Avatar, Button} from '@mui/material';

import {userProfileStore} from '../../utils/zustand.store';
import theme from '../../config/theme';
import EmployeeProfileForm from '../Cards/EmployeeProfileForm';

const ContactInfo: FC = () => {
	// Zustand Store
	const {avatar_url_path, localProfileInfo} = userProfileStore();
	// Profile Info
	const {first_name, last_name, email, personal_email, phone, department, profile_picture} = localProfileInfo;
	const localProfileAvatar = `${avatar_url_path}${profile_picture}`;
	// Theme
	const {gray} = theme.palette;

	return (
		<Container>
			<Box sx={{minWidth: 250, display: {sx: 'column', md: 'flex'}}}>
				<Stack
					spacing={2}
					sx={{maxWidth: '500px', mb: 4}}>
					<Avatar
						sx={{
							display: {xs: 'block', sm: 'none'},
							width: '120px',
							height: 'auto',
							m: 2,
							alignSelf: 'center',
							border: '2px solid',
							borderColor: 'primary.main',
						}}
						alt="profile image"
						src={profile_picture ? localProfileAvatar : '../src/assets/default_user.png'}></Avatar>
					<Typography
						variant="h5"
						sx={styles.header}>
						Profile Info
					</Typography>
					<Box sx={styles.user_info_box}>
						<Paper
							elevation={1}
							square
							sx={styles.paper}>
							<Typography sx={styles.detail}>{first_name}</Typography>
							<Divider />
							<Typography sx={styles.helper}>First Name</Typography>
						</Paper>
						<Paper
							elevation={1}
							square
							sx={styles.paper}>
							<Typography sx={styles.detail}>{last_name}</Typography>
							<Divider />
							<Typography sx={styles.helper}>Last Name</Typography>
						</Paper>
					</Box>
					<Box sx={styles.user_info_box}>
						<Paper
							elevation={1}
							square
							sx={styles.paper}>
							<Typography sx={styles.detail}>{department}</Typography>
							<Divider />
							<Typography sx={styles.helper}>Department</Typography>
						</Paper>
						<Paper
							elevation={1}
							square
							sx={styles.paper}>
							<Typography sx={styles.detail}>{phone}</Typography>
							<Divider />
							<Typography sx={styles.helper}>Phone</Typography>
						</Paper>
					</Box>
					<Typography
						variant="h5"
						sx={styles.header}>
						Contact Details
					</Typography>
					<Box sx={styles.user_info_box}>
						<Paper
							elevation={1}
							square
							sx={styles.paper}>
							<Typography sx={styles.detail}>{email}</Typography>
							<Divider />
							<Typography sx={styles.helper}>Email</Typography>
						</Paper>
						<Paper
							elevation={1}
							square
							sx={styles.paper}>
							<Typography sx={styles.detail}>{personal_email}</Typography>
							<Divider />
							<Typography sx={styles.helper}>Private Email</Typography>
						</Paper>
					</Box>
				</Stack>
				<Box sx={styles.update}>
					<Avatar
						sx={styles.avatar}
						alt="profile image"
						src={profile_picture ? localProfileAvatar : '../src/assets/default_user.png'}></Avatar>

					<Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
						<EmployeeProfileForm />

						<Button
							variant="contained"
							sx={{width: '100%'}}>
							Update Password
						</Button>
					</Box>
				</Box>
			</Box>
			<Divider />
			<Typography
				variant="h5"
				sx={styles.header}>
				Certificates
			</Typography>
		</Container>
	);
};

export default ContactInfo;

/** @type {import("@mui/material").SxProps} */
const styles = {
	user_info_box: {
		display: 'flex',
		gap: 4,
		flexDirection: {xs: 'column', sm: 'row'},
		justifiedContent: 'space-between',
		alignItems: 'center',
		overflow: 'auto',
		padding: '10px',

		maxWidth: '500px',

		['::-webkit-scrollbar ']: {
			display: 'none',
		},
	},
	header: {
		textAlign: {xs: 'center', sm: 'left'},
	},
	detail: {px: 1, fontSize: '20px'},
	paper: {
		width: '100%',
		minWidth: '200px',
		maxWidth: '350px',
		p: 1,
	},
	helper: {
		color: 'gray.main',
		px: 1,
		fontSize: '14px',
	},
	avatar: {
		display: {xs: 'none', sm: 'block', md: 'block'},
		width: '100%',
		maxWidth: '120px',
		height: 'auto',
		maxHeight: '120px',
		border: 3,
		borderColor: 'primary.main',
	},
	update: {
		display: 'flex',
		flexDirection: {sm: 'row', md: 'column'},
		justifyContent: 'center',
		alignItems: 'center',
		width: {xs: '230px', sm: '400px', md: '230px'},
		maxWidth: {xs: '230px', sm: '400px', md: '230px'},
		gap: 3,
		p: 2,
		mx: {xs: 'auto', sm: 4, md: 0},
	},
};

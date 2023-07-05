import {Container, Typography, Box, Paper, Divider, Stack, Avatar} from '@mui/material';

import {userProfileStore} from '../../utils/zustand.store';
import TagsList from '../Create/TagsList';

const EmployeePendingInfo = ({user}: any) => {
	// Zustand Store
	const {avatar_url_path} = userProfileStore();

	// Destructuring User
	const pendingUser = user;
	const {first_name, last_name, email, phone, department, profile_picture} = pendingUser;

	// Profile Info
	const localProfileAvatar = `${avatar_url_path}${profile_picture}`;

	return (
		<Container>
			<Box sx={{minWidth: 250, display: 'column'}}>
				<Stack
					spacing={2}
					sx={{maxWidth: '500px', mb: 4}}>
					<Avatar
						sx={styles.avatar}
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
							<Typography sx={styles.detail}>
								{phone ? phone : <span style={{color: 'lightgrey'}}>none</span>}
							</Typography>
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
					</Box>
				</Stack>
				<Divider />
				<Box sx={styles.update}>
					<TagsList />

					{/* <Typography variant="overline">{}</Typography> */}
				</Box>
			</Box>
		</Container>
	);
};

export default EmployeePendingInfo;

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
		textAlign: 'left',
		borderBottom: '2px solid',
		borderColor: 'secondary.main',
		width: 'fit-content',
		pr: 2,
	},
	detail: {px: 1, fontSize: '20px', wordWrap: 'break-word'},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'end',
		width: '100%',
		height: '100%',
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
		display: 'block',
		width: '130px',
		height: 'auto',
		maxHeight: '130px',
		border: 3,
		borderColor: 'primary.main',
		objectFit: 'cover',
		m: 2,
		alignSelf: 'center',
	},
	update: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: '200px',
		m: 2,
		mx: 'auto',
	},
};

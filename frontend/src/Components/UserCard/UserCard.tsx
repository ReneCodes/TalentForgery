import { Container, Box, Typography } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

function UserCard({ first_name, last_name, profile_picture, email, callback }: any) {
	const imageUrl = `${baseURL}/${profile_picture}`;

	return (
		<Container
			sx={{
				m: 'auto 0',
				width: '100%',
				maxWidth: '300px',
				p: 2,
				backgroundColor: '#fffff',
				display: { xs: 'column', sm: 'flex' },
				justifyContent: { xs: 'center', sm: 'space-between' },
				alignItems: 'center',
				textAlign: { xs: 'center', sm: 'left' },
				borderRadius: '4px',
				boxShadow:
					'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
				gap: 3,
				':hover': {
					cursor: 'pointer',
					backgroundColor: 'secondary.main',
					borderColor: 'secondary.main',
				},
			}}
			onClick={callback}>
			<Box sx={{ color: 'gray.900' }}>
				<Typography variant="h6">
					{first_name} {last_name}
				</Typography>
				<Typography
					variant="caption"
					sx={{ fontSize: '12px', color: 'gray.700' }}>
					{email}
				</Typography>
			</Box>

			<Box
				sx={{
					mb: 1,
					mx: { xs: 'auto', sm: 0 },
					my: { xs: 1, sm: 0 },
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minWidth: '60px',
					minHeight: '60px',
					maxWidth: '60px',
					maxHeight: '60px',
					borderRadius: 99,
					overflow: 'hidden',
					border: '2px solid',
					borderColor: 'primary.main',
					backgroundColor: 'white.main',
				}}>
				{profile_picture ? (
					<img
						style={{ objectFit: 'cover', width: '100%', height: '100%' }}
						src={imageUrl}
						alt="user avatar"
					/>
				) : (
					<FaceIcon sx={{ width: 70, height: 70 }} />
				)}
			</Box>
		</Container>
	);
}

export default UserCard;

import Button from '@mui/material/Button';
import {Container, Box, Typography} from '@mui/material';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import theme from '../config/theme';

const Home = () => {
	const navigate: NavigateFunction = useNavigate();
	const {primary, secondary, gray, white} = theme.palette;

	return (
		<Container
			sx={{
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: 'max-content',
				mt: 4,
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: {xs: 'column', sm: 'row'},
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '80%',
					maxWidth: '800px',
					m: 'auto',
				}}>
				<Box
					display="flex"
					gap={1}
					sx={{':hover': {cursor: 'pointer'}}}
					onClick={() => navigate('/')}>
					<Typography
						sx={{color: secondary.main, fontSize: '24px'}}
						variant="overline">
						Minon
					</Typography>
					<Typography
						sx={{color: primary.main, fontSize: '24px'}}
						variant="overline">
						Mentor
					</Typography>
				</Box>
				<Box>
					<Button
						aria-label="login"
						onClick={() => navigate('/login')}
						sx={{
							p: 1,
							px: 2,
							backgroundColor: secondary.main,
							color: gray[900],
							':hover': {
								backgroundColor: secondary[900],
							},
						}}>
						Login
					</Button>
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '80%',
					maxWidth: '800px',
					mx: 'auto',
					my: 6,
				}}>
				<Typography variant="overline">
					Unlock the power of our web app: effortlessly compose training tutorials, craft engaging questionnaires,
					empower your staff through effective training, and foster a collaborative work environment for seamless
					knowledge sharing.
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					width: '100%',
					maxWidth: '800px',
					mx: 'auto',
				}}>
				<Typography variant="h4">
					Start using <span style={{color: secondary.main}}>Minon</span>{' '}
					<span style={{color: primary.main}}>Mentor</span> <span style={{color: 'black'}}>Today</span>
				</Typography>
				<Button
					variant="contained"
					onClick={() => navigate('/register')}
					sx={{
						width: '200px',
						m: 4,
						backgroundColor: primary.main,
						':hover': {
							backgroundColor: primary[800],
						},
					}}>
					Register
				</Button>
			</Box>
		</Container>
	);
};

export default Home;

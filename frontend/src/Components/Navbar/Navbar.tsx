import {FC} from 'react';
import {MinonStore} from '../../utils/zustand.store';
import {Button, Box} from '@mui/material';
import {useNavigate, NavigateFunction} from 'react-router-dom';

export const Navbar: FC = () => {
	const {minon, increase, decrease} = MinonStore();
	const navigate: NavigateFunction = useNavigate();

	return (
		<div>
			<p>Navbar</p>
			<div className="box">
				<Button
					onClick={() => decrease(1)}
					variant="contained"
					color="error"
					aria-label="remove minion">
					- minons
				</Button>
				<span style={{color: 'blue', padding: '5px'}}>{minon}</span>
				<Button
					onClick={() => increase(1)}
					variant="contained"
					color="success"
					aria-label="add minion">
					+ minons
				</Button>
			</div>

			<Box
				sx={{
					width: 120,
					display: 'flex',
					flexDirection: 'column',
					alignContent: 'center',
					gap: 2,
					margin: 'auto',
				}}>
				<Button
					onClick={() => navigate('./login')}
					variant="contained"
					aria-label="go to login page">
					Login
				</Button>
				<Button
					onClick={() => navigate('./register')}
					variant="contained"
					aria-label="go to register page">
					Register
				</Button>
			</Box>
		</div>
	);
};

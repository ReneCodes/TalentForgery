import { Container, Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { getAdminInvite } from '../services/Api.service';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { PendingUserStore } from '../utils/zustand.store';
import EmployeePendingCard from '../Components/Cards/EmployeePendingCard';

const Dashboard = () => {

	const [linkText, setLinkText] = useState<String>('Copy your link');

	const navigate: NavigateFunction = useNavigate();
	const { pendingPerson } = PendingUserStore();

	function handleInviteClick() {
		getAdminInvite(setLinkText);
	}

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

			{pendingPerson &&
				pendingPerson.map((user) => (
					<Box key={user.dataValues.profile_picture}>
						<EmployeePendingCard user={user} />
					</Box>
				))}

		</Container >
	);
};

export default Dashboard;

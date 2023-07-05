import { Container, Box, Button, Typography, Dialog, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { acceptUser, rejectUser } from '../services/Api.service';
import { PendingUserStore, TutorialTagStore } from '../utils/zustand.store';
import UserCard from '../Components/UserCard/UserCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../config/theme';
import EmployeePendingCard from '../Components/Cards/EmployeePendingCard';

const Dashboard = () => {

	const { pendingPerson } = PendingUserStore();
	console.log(pendingPerson, 'PENDING PERSON');


	return (
		<Box
			sx={{
				minHeight: '100%',
				height: 'max-content',
				width: '100%',
				display: 'flex',
				gap: 4,
				flexDirection: 'column',
				justifyContent: 'start',
				position: 'relative',
				alignItems: { xs: 'center', sm: 'flex-start' },
			}}>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', p: 0 }}>
				{pendingPerson[0] ? (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', pt: 2 }}>
							<Typography
								variant="h4"
								sx={{ m: 2, borderBottom: '2px solid', borderColor: 'primary.main', width: 'fit-content' }}>
								Total Pending Users: {pendingPerson.length}
							</Typography>
						</Box>
						<Box sx={{ m: 2 }}>
							{pendingPerson &&
								pendingPerson.map((user: any) => (
									<Box key={user.profile_picture}>
										<EmployeePendingCard user={user} />
									</Box>
								))}
						</Box>
					</Box>
				) : (
					<Box sx={{ position: 'absolute' }}>
						<Typography variant="h4">You have no users pending</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Dashboard;

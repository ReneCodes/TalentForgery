import { Box,Typography, } from '@mui/material';
import { PendingUserStore } from '../utils/zustand.store';
import EmployeePendingCard from '../Components/Cards/EmployeePendingCard';

const Dashboard = () => {

	const { pendingPerson } = PendingUserStore();
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
								sx={{m: 2, borderBottom: '2px solid', borderColor: 'primary.main', width: 'fit-content', pr: 3}}>
								Total Pending Users: {pendingPerson.length}
							</Typography>
						</Box>
						<Box sx={{ m: 2, display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
							{pendingPerson &&
								pendingPerson.map((user: any) => (
									<Box key={user.profile_picture} sx={{mb:2}}>
										<EmployeePendingCard user={user} />
									</Box>
								))}
						</Box>
					</Box>
				) : (
					<Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
						<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', pt: 2}}>
							<Typography
								variant="h4"
								sx={{m: 2, borderBottom: '2px solid', borderColor: 'primary.main', width: 'fit-content'}}>
								There are no users pending
							</Typography>
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Dashboard;

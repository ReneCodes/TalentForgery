import { Container, Box, Button, Typography } from '@mui/material';
import PieChartComp from '../Components/PieChart/PieChart';
import { useEffect, useState } from 'react';
import { acceptUser, authUser, getAdminInvite, getPendingUsers, rejectUser } from '../services/Api.service';
import SmallInfo from '../Components/SmallInfo/SmallInfo';
import { person } from '../@types/Types';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import PendingUsersCard from '../Components/Cards/PendingUserCard';

const Dashboard = () => {
	const [linkText, setLinkText] = useState<String>('Copy your link');
	const [peoplePending, setPeoplePending] = useState<person[]>([]);

	const [showStats, setShowStats] = useState<boolean>(false);
	const [stats, setStats] = useState<any>(undefined);

	const navigate: NavigateFunction = useNavigate();

	function handleInviteClick() {
		getAdminInvite(setLinkText);
	}

	useEffect(() => {
		authUser(navigate, () => getPendingUsers(setPeoplePending));
	}, []);

	function rejectPerson(email: string) {
		rejectUser(email, setPeoplePending);
	};

	function acceptPerson(email: string) {
		acceptUser(email, setPeoplePending);
	};

	function showUserStats(info: person) {
		setShowStats(true);
		setStats(info);
	};

	function hideUserStats() {
		setStats(undefined);
		setShowStats(false);
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

			{showStats && <PendingUsersCard
				closeStats={hideUserStats}
				accept={() => {setShowStats(false); acceptPerson(stats.dataValues.email)}}
				reject={() => {setShowStats(false); rejectPerson(stats.dataValues.email)}}
				stats={stats} />}

			<>
				<Box
					sx={{
						height: 'max-content',
						width: '100%',
						overflow: 'hidden',
						p: 5,
						display: 'flex',
						justifyContent: 'start',
						gap: 4,
					}}>

					<PieChartComp width={100} passed={63} todo={20} failed={30} />
					<PieChartComp width={100} passed={10} todo={20} failed={30} />

					<Box
						sx={{
							width: '200px',
							height: '100px',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							pt: '10px',
							borderRadius: 5,
							backgroundColor: '#00407E',
							color: '#ffffff',
						}}
						boxShadow={10}>
						<Typography fontSize="20px" mb='5px'>Invite new people</Typography>
						<Button
							sx={{ width: '100%', height: 'max-content', p: 2, backgroundColor: '#BFA622', ':hover': { backgroundColor: '#fff5be', color: '#00407e' } }}
							variant="contained"
							onClick={handleInviteClick}>
							<Typography fontSize="16px">
								<strong>{linkText}</strong>
							</Typography>
						</Button>
					</Box>
				</Box>

				{peoplePending[0] && (
					<Box
						sx={{
							maxWidth: '100%',
							flexWrap: 'wrap',
							height: 'max-content',
							p: 2,
							display: 'flex',
							overflow: 'hidden',
							justifyContent: 'start',
							alignItems: 'start',
							gap: 4,
							borderRadius: 5,
							color: '#00000',
						}}>
						{peoplePending.map((person: person) => (
							<SmallInfo
								key={person.first_name}
								first_name={person.first_name}
								last_name={person.last_name}
								profile_picture={person.profile_picture}
								accept={() => acceptPerson(person.email)}
								reject={() => rejectPerson(person.email)}
								userInfo={() => showUserStats(person)}
							/>
						))}
					</Box>
				)}
			</>


		</Container >
	);
};

export default Dashboard;

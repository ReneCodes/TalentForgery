import {Container, Box, Button, Typography} from '@mui/material';
import PieChartComp from '../Components/PieChart/PieChart';
import {useEffect, useState} from 'react';
import {acceptUser, authUser, getAdminInvite, getPendingUsers, rejectUser} from '../services/Api.service';
import SmallInfo from '../Components/SmallInfo/SmallInfo';
import {person} from '../@types/Types';
import {NavigateFunction, useNavigate} from 'react-router-dom';

const Dashboard = () => {
	const [linkText, setLinkText] = useState<String>('Copy your link');
	const [peoplePending, setPeoplePending] = useState<person[]>([]);
	const navigate: NavigateFunction = useNavigate();

	function handleInviteClick() {
		getAdminInvite(setLinkText);
	}

	useEffect(() => {
		authUser(navigate, () => getPendingUsers(setPeoplePending));
	}, []);

	function rejectPerson(email: string) {
		rejectUser(email, setPeoplePending);
	}

	function acceptPerson(email: string) {
		acceptUser(email, setPeoplePending);
	}

	return (
		<Container
			sx={{
				minHeight: '100%',
				// height: 'max-content',
				width: '100%',
				display: 'flex',
				gap: 4,
				flexDirection: 'column',
				justifyContent: 'start',
			}}>
			<Box
				sx={{
					height: 'max-content',
					width: '100%',
					overflow: 'hidden',
					p: 5,
					display: 'flex',
					justifyContent: 'start',
					gap: 10,
				}}>
				<PieChartComp
					width={100}
					passed={63}
					todo={20}
					failed={30}
				/>

				<Box
					sx={{
						width: '100%',
						overflow: 'hidden',
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 4,
						borderRadius: 5,
						backgroundColor: '#00407E',
						color: 'white',
					}}
					boxShadow={10}>
					<Typography variant="h5">Invite new people</Typography>
					<Button
						sx={{width: '200px', height: '100px', backgroundColor: '#BFA622', borderRadius: '20px'}}
						variant="contained"
						onClick={handleInviteClick}>
						<Typography fontSize="20px">
							<strong>{linkText}</strong>
						</Typography>
					</Button>
				</Box>
			</Box>

			{peoplePending[0] && (
				<Box
					sx={{
						width: '100%',
						height: 'max-content',
						p: 2,
						display: 'flex',
						overflow: 'hidden',
						justifyContent: 'start',
						alignItems: 'start',
						gap: 4,
						borderRadius: 5,
						backgroundColor: '#fff5be',
						color: 'white',
					}}>
					{peoplePending.map((person: person) => (
						<SmallInfo
							first_name={person.first_name}
							last_name={person.last_name}
							profile_picture={person.profile_picture}
							accept={() => acceptPerson(person.email)}
							reject={() => rejectPerson(person.email)}
						/>
					))}
				</Box>
			)}
		</Container>
	);
};

export default Dashboard;

// @ts-ignore
import React, {FC} from 'react';
import SmallVideoCard from '../../Components/Cards/SmallVideoCard';
import {Box, Typography} from '@mui/material';
// import EmployeePendingCard from '../../Components/Cards/EmployeePendingCard';
// import EmployeeProfileForm from '../../Components/Cards/EmployeeProfileForm';
// import WatchTutorial from '../../Components/WatchTutorial/WatchTutorial';
// import {TutorialVideoDataType} from '../../@types/Types';
import TimedTutorialCard from '../../Components/Cards/TimedTutorial/TimedTutorialCard';
import {PendingUserStore, TutorialStore} from '../../utils/zustand.store';

import {SmallVideoData} from '../../@types/Types';

export const HomeMe = () => {
	const {pendingPerson} = PendingUserStore();

	const {userTutorials} = TutorialStore();
	const generalTutorials = userTutorials[0];
	const scheduledTutorials = userTutorials[1];
	// console.log('generalTutorials', generalTutorials);
	// console.log('scheduledTutorials', scheduledTutorials);
	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', sm: 'flex-start'}, m: 'auto'}}>
			<Typography
				variant="h4"
				sx={{m: 2, borderBottom: '2px solid', borderColor: 'primary.main', width: 'fit-content'}}>
				Latest Tutorials
			</Typography>
			<Box sx={styles.noBar}>
				{generalTutorials &&
					generalTutorials.slice(0, 4).map((videoData: SmallVideoData['videoData']) => (
						<Box
							key={Math.floor(Math.random() * 99999999)}
							sx={{mb: 2}}>
							<SmallVideoCard videoData={videoData} />
						</Box>
					))}
			</Box>
			<Typography
				variant="h4"
				sx={{m: 2, borderBottom: '2px solid red', borderColor: 'secondary.main', width: 'fit-content'}}>
				Scheduled Tutorials
			</Typography>
			<Box sx={styles.noBar}>
				{scheduledTutorials.length > 0 &&
					scheduledTutorials.slice(0, 4).map((videoData: SmallVideoData['videoData']) => (
						<Box key={Math.floor(Math.random() * 99999999)}>
							<TimedTutorialCard videoData={videoData} />
						</Box>
					))}
			</Box>
		</Box>
	);
};

/** @type {import("@mui/material").SxProps} */
const styles = {
	noBar: {
		display: 'flex',
		flexDirection: {xs: 'column', sm: 'row'},
		alignItems: 'center',
		gap: 2,
		mb: 4,
		m: 'auto',
		width: '100%',
		overflow: 'auto',
		whiteSpace: 'nowrap',
		padding: '10px',
		['::-webkit-scrollbar ']: {
			display: 'none',
		},
	},
};

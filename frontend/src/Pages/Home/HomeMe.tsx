// @ts-ignore
import React, {FC, useEffect, useState} from 'react';
import SmallVideoCard from '../../Components/Cards/SmallVideoCard';
import {Box, Typography} from '@mui/material';
// import EmployeePendingCard from '../../Components/Cards/EmployeePendingCard';
// import EmployeeProfileForm from '../../Components/Cards/EmployeeProfileForm';
// import WatchTutorial from '../../Components/WatchTutorial/WatchTutorial';
// import {TutorialVideoDataType} from '../../@types/Types';
import TimedTutorialCard from '../../Components/Cards/TimedTutorial/TimedTutorialCard';
import {TutorialStore, userProfileStore} from '../../utils/zustand.store';

import {SmallVideoData} from '../../@types/Types';
import {sortAccessDate, tutorialHasTagFilter} from '../../utils/filterFunction';

export const HomeMe = () => {
	const {getUserRole} = userProfileStore();

	const {userTutorials, allTutorials} = TutorialStore();
	const generalTutorials = sortAccessDate('newest', userTutorials[0]);
	const scheduledTutorials = sortAccessDate('newest', userTutorials[1]);

	const [adminScheduledTutorials, setAdminScheduledTutorials] = useState<SmallVideoData['videoData'][]>([]);

	useEffect(() => {
		const hasTags = tutorialHasTagFilter(allTutorials);
		const newest = sortAccessDate('newest', hasTags);
		setAdminScheduledTutorials(newest);
	}, [allTutorials]);

	// console.log('generalTutorials', generalTutorials);
	// console.log('scheduledTutorials', scheduledTutorials);
	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', sm: 'flex-start'}, m: 'auto'}}>
			<Typography
				variant="h4"
				sx={[styles.headline, styles.blue]}>
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
				sx={[styles.headline, styles.yellow]}>
				Scheduled Tutorials
			</Typography>
			{getUserRole() === 'user' && (
				<Box sx={styles.noBar}>
					{scheduledTutorials.length > 0 &&
						scheduledTutorials.slice(0, 4).map((videoData: SmallVideoData['videoData']) => (
							<Box key={Math.floor(Math.random() * 99999999)}>
								<TimedTutorialCard videoData={videoData} />
							</Box>
						))}
				</Box>
			)}
			{getUserRole() === 'admin' && (
				<Box sx={styles.noBar}>
					{adminScheduledTutorials.length > 0 &&
						adminScheduledTutorials.slice(0, 4).map((videoData: SmallVideoData['videoData']) => (
							<Box key={Math.floor(Math.random() * 99999999)}>
								<TimedTutorialCard videoData={videoData} />
							</Box>
						))}
				</Box>
			)}
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
	headline: {m: 2, borderBottom: '2px solid', width: 'fit-content', pr: 3},
	blue: {
		borderColor: 'primary.main',
	},
	yellow: {
		borderColor: 'secondary.main',
	},
};

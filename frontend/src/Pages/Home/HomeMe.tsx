// @ts-ignore
import React, {FC} from 'react';
import SmallVideoCard from '../../Components/Cards/SmallVideoCard';
import {Box, Typography} from '@mui/material';
import EmployeePendingCard from '../../Components/Cards/EmployeePendingCard';
import EmployeeProfileForm from '../../Components/Cards/EmployeeProfileForm';
import WatchTutorial from '../../Components/WatchTutorial/WatchTutorial';
import {TutorialVideoDataType} from '../../@types/Types';
import TimedTutorialCard from '../../Components/Cards/TimedTutorial/TimedTutorialCard';
import {PendingUserStore, TutorialStore} from '../../utils/zustand.store';

const mockVideoArray = [
	{
		title: 'How to peel a Banana',
		video_url: '16884561345341688456134534dance(540p).mp4',
		video_thumb: '/src/assets/Temp_assets/chemist_thumb.png',
		description: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatem cupiditate, corporis laudantium explicabo maiores harum aliquid non nobis impedit, recusandae laborum rem alias ducimus id numquam aliquam. Sequi ad earum a deleniti, cum veritatis accusantium recusandae laboriosam autem nesciunt.`,
		topic: 'science',
	},
	{
		title: "What's that sound",
		video_url: '/src/assets/Temp_assets/ambient_sound30s.mp4',
		video_thumb: '/src/assets/Temp_assets/ambient_thumb.png',
		description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque iste totam perferendis ratione at quia fugit praesentium aliquam labore vel voluptate illo dolorem reiciendis nesciunt minus voluptatem, assumenda excepturi nulla et libero harum neque sunt? Sunt illum nihil, aliquid eos sit neque repellat qui cum placeat eum praesentium temporibus laudantium perferendis a, nobis inventore dolorem aliquam autem debitis excepturi porro quasi eligendi consequatur mollitia? Tenetur adipisci perferendis quisquam eius?`,
		topic: 'survival',
	},
	{
		title: "What's that sound",
		video_url: '/src/assets/Temp_assets/ambient_sound30s.mp4',
		video_thumb: '/src/assets/Temp_assets/ambient_thumb.png',
		description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque iste totam perferendis ratione at quia fugit praesentium aliquam labore vel voluptate illo dolorem reiciendis nesciunt minus voluptatem, assumenda excepturi nulla et libero harum neque sunt? Sunt illum nihil, aliquid eos sit neque repellat qui cum placeat eum praesentium temporibus laudantium perferendis a, nobis inventore dolorem aliquam autem debitis excepturi porro quasi eligendi consequatur mollitia? Tenetur adipisci perferendis quisquam eius?`,
		topic: 'survival',
	},
];

export const HomeMe = () => {
	const {userTutorials} = TutorialStore();
	const {pendingPerson} = PendingUserStore();
	const generalTutorials = userTutorials[0];
	const scheduledTutorials = userTutorials[1];
	// console.log('generalTutorials', generalTutorials);
	// console.log('scheduledTutorials', scheduledTutorials);
	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', sm: 'flex-start'}, m: 'auto'}}>
			<Typography
				variant="h4"
				sx={{m: 2, borderBottom: '2px solid red', borderColor: 'primary.main', width: 'fit-content'}}>
				Latest Tutorials
			</Typography>
			<Box sx={styles.noBar}>
				{generalTutorials &&
					generalTutorials.slice(0, 4).map((videoData) => (
						<Box
							key={Math.floor(Math.random() * 99999999)}
							sx={{mb: 2}}>
							<SmallVideoCard videoData={videoData} />
						</Box>
					))}
			</Box>

			<Box sx={{}}>
				{pendingPerson &&
					pendingPerson.map((user) => (
						<Box key={user.dataValues.profile_picture}>
							<EmployeePendingCard user={user} />
						</Box>
					))}
			</Box>

			{/* TODO: INSERT TimedTutorials */}
			{/* <Box sx={styles.noBar}>
					{mockVideoArray.length > 0 &&
						mockVideoArray.map((videoData: TutorialVideoDataType) => (
							<Box key={Math.floor(Math.random() * 99999)}>
								<WatchTutorial videoData={videoData} />
							</Box>
						))}
				</Box> */}
			<Typography
				variant="h4"
				sx={{m: 2, borderBottom: '2px solid red', borderColor: 'secondary.main', width: 'fit-content'}}>
				Scheduled Tutorials
			</Typography>
			<Box sx={styles.noBar}>
				{scheduledTutorials.length > 0 &&
					scheduledTutorials.slice(0, 4).map((videoData) => (
						<Box
							key={Math.floor(Math.random() * 99999999)}
							sx={{mb: 2}}>
							<SmallVideoCard videoData={videoData} />
							<TimedTutorialCard videoData={videoData} />
						</Box>
					))}
				{scheduledTutorials.length >= 0 && (
					<Box key={Math.floor(Math.random() * 99999999)}>
						<TimedTutorialCard videoData={generalTutorials} />
					</Box>
				)}
			</Box>
		</Box>
	);
};

/** @type {import("@mui/material").SxProps} */
const styles = {
	noBar: {
		display: {xs: 'column', sm: 'flex'},
		gap: 2,
		columnGap: 2,
		overflow: 'auto',
		whiteSpace: 'nowrap',
		padding: '10px',
		['::-webkit-scrollbar ']: {
			display: 'none',
		},
	},
};

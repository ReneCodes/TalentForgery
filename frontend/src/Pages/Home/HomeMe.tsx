// @ts-ignore
import React, {FC} from 'react';
import SmallVideoCard from '../../Components/Cards/SmallVideoCard';
import {Box} from '@mui/material';
import EmployeePendingCard from '../../Components/Cards/EmployeePendingCard';
import EmployeeProfileForm from '../../Components/Cards/EmployeeProfileForm';
import WatchTutorial from '../../Components/WatchTutorial/WatchTutorial';
import {TutorialVideoDataType} from '../../@types/Types';
import TimedTutorialCard from '../../Components/Cards/TimedTutorial/TimedTutorialCard';

const mockVideoArray = [
	{
		title: 'How to peel a Banana',
		source: '/src/assets/Temp_assets/chemist13s.mp4',
		thumbnail: '/src/assets/Temp_assets/chemist_thumb.png',
		description: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatem cupiditate, corporis laudantium explicabo maiores harum aliquid non nobis impedit, recusandae laborum rem alias ducimus id numquam aliquam. Sequi ad earum a deleniti, cum veritatis accusantium recusandae laboriosam autem nesciunt.`,
		topic: 'science',
		watched: false,
		has_form: true,
		from_done: false,
	},
	{
		title: "What's that sound",
		source: '/src/assets/Temp_assets/ambient_sound30s.mp4',
		thumbnail: '/src/assets/Temp_assets/ambient_thumb.png',
		description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque iste totam perferendis ratione at quia fugit praesentium aliquam labore vel voluptate illo dolorem reiciendis nesciunt minus voluptatem, assumenda excepturi nulla et libero harum neque sunt? Sunt illum nihil, aliquid eos sit neque repellat qui cum placeat eum praesentium temporibus laudantium perferendis a, nobis inventore dolorem aliquam autem debitis excepturi porro quasi eligendi consequatur mollitia? Tenetur adipisci perferendis quisquam eius?`,
		topic: 'survival',
		watched: true,
		has_form: true,
		from_done: true,
	},
	{
		title: "What's that sound",
		source: '/src/assets/Temp_assets/ambient_sound30s.mp4',
		thumbnail: '/src/assets/Temp_assets/ambient_thumb.png',
		description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque iste totam perferendis ratione at quia fugit praesentium aliquam labore vel voluptate illo dolorem reiciendis nesciunt minus voluptatem, assumenda excepturi nulla et libero harum neque sunt? Sunt illum nihil, aliquid eos sit neque repellat qui cum placeat eum praesentium temporibus laudantium perferendis a, nobis inventore dolorem aliquam autem debitis excepturi porro quasi eligendi consequatur mollitia? Tenetur adipisci perferendis quisquam eius?`,
		topic: 'survival',
		watched: true,
		has_form: false,
		from_done: false,
	},
];

export const HomeMe = () => {
	return (
		<Box>
			<h1>Home</h1>
			<Box sx={styles.noBar}>
				{mockVideoArray.length > 0 &&
					mockVideoArray.map((videoData) => (
						<Box key={Math.floor(Math.random() * 99999)}>
							<SmallVideoCard videoData={videoData} />
						</Box>
					))}
			</Box>
			<Box sx={{}}>
				<EmployeePendingCard />

				<Box sx={styles.noBar}>
					{mockVideoArray.length > 0 &&
						mockVideoArray.map((videoData: TutorialVideoDataType) => (
							<Box key={Math.floor(Math.random() * 99999)}>
								<WatchTutorial videoData={videoData} />
							</Box>
						))}
				</Box>
				<TimedTutorialCard />
			</Box>
		</Box>
	);
};

/** @type {import("@mui/material").SxProps} */
const styles = {
	noBar: {
		display: 'flex',
		gap: 2,
		overflow: 'auto',
		whiteSpace: 'nowrap',
		padding: '10px',
		['::-webkit-scrollbar ']: {
			display: 'none',
		},
	},
};

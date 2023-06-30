// @ts-ignore
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import theme from '../../../config/theme';
import TimedVideoDialog from './TimedVideoDialog';
import TimedVideoInfo from './TimedVideoInfo';
import TimedWatchTutorial from './TimedWatchTutorial';

// Icons

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const questionData = [
	{
		question: 'This is the Question',
		options: ['this is an option', 'when its green its the answer', 'press delete to remove the tutorial'],
		answer: 'when its green its the answer',
	},
	{
		question: 'hi',
		options: ['1', '2', '3'],
		answer: '3',
	},
	{
		question: 'Where is steve?',
		options: ['Detroit', 'Michigan', 'Orlando'],
		answer: 'Detroit',
	},
];

const videoData = {
	title: 'Warehaouse Safty Regulations',
	video_url: 'src/assets/Temp_assets/warehouse.mp4',
	description: 'Learn how to use a forklift and move around safely in the warehouse',
	question_ids: [questionData[0], questionData[1], questionData[2]],
	questions_shown: 2,
	access_date: 'Wed, 21 Jun 2023 23:00:00 GMT',
	due_date: 'Thu, 29 Jun 2023 23:00:00 GMT',
};
// TODO: get the TS Prop Type right
const TimedTutorialCard = () => {
	const {white, secondary, gray, green} = theme.palette;
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const {description, question_ids, access_date, due_date, video_url, title} = videoData;

	// CALC ACCESS ALLOWANCE
	function allowedAccess() {}

	return (
		<Card sx={{maxWidth: 345, minWidth: 300, position: 'relative'}}>
			{dialogOpen && (
				<TimedVideoDialog
					dialogOpen={dialogOpen}
					setDialogOpen={setDialogOpen}
					videoData={videoData}
				/>
			)}
			<CardMedia
				component="img"
				alt={title}
				height="200"
				image="src/assets/Temp_assets/purple.png"
			/>
			<CardContent>
				<CardActions sx={{position: 'absolute', top: 100, left: '50%', transform: 'translate(-50%,-50%)'}}>
					{/* <Button
						onClick={() => setDialogOpen(true)}
						size="medium"
						variant="outlined"
						sx={{
							backgroundColor: white.main,
							border: '1px solid',
							borderColor: gray['300'],
							color: gray['900'],
							':hover': {
								backgroundColor: secondary.main,
								borderColor: secondary.main,
							},
						}}>
						Start Tutorial
					</Button> */}
					<TimedWatchTutorial videoData={videoData} />
				</CardActions>
				<Typography
					gutterBottom
					variant="h5"
					component="div">
					{title}
				</Typography>
				<Box sx={{display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center'}}>
					<TimedVideoInfo videoData={videoData} />
					<Box sx={{display: 'flex'}}>
						{/* {watched && <CheckCircleIcon sx={{color: green.main, mr: 1}} />}
						{has_form ? (
							<Box>
								{from_done ? (
									<AssignmentTurnedInIcon sx={{color: green['900']}} />
								) : (
									<AssignmentIcon sx={{color: secondary.main}} />
                  )}
                  </Box>
                ) : null} */}
						<AssignmentIcon sx={{color: secondary.main}} />
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default TimedTutorialCard;

// const style = {
// 	flexDirection: 'column',
// } as const;

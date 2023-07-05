// @ts-ignore
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import theme from '../../../config/theme';
import TimedVideoInfo from './TimedVideoInfo';
import TimedWatchTutorial from './TimedWatchTutorial';

// Icons
import AssignmentIcon from '@mui/icons-material/Assignment';
import {TutorialStore} from '../../../utils/zustand.store';
import {getQuestions} from '../../../services/Api.service';

// TODO: get the TS Prop Type right
const TimedTutorialCard = ({videoData}: any) => {
	// Color Theme
	const {secondary} = theme.palette;
	// Zustand Stores
	const {video_base_url} = TutorialStore();
	//
	const {title, video_thumb, tutorial_id} = videoData;
	// Local Stores
	const [tutorialQuestions, setTutorialQuestions] = React.useState([]);

	React.useEffect(() => {
		fetchQuestions();
	}, []);

	function fetchQuestions() {
		getQuestions({tutorial_id}, setTutorialQuestions);
	}

	// TODO: CALC ACCESS ALLOWANCE
	function allowedAccess() {}

	return (
		<Card sx={{maxWidth: 345, minWidth: 300, position: 'relative'}}>
			<CardMedia
				// VIDEO THUMB
				component="img"
				alt={title}
				height="200"
				image={`${video_base_url}${video_thumb}`}
			/>
			<CardContent>
				<CardActions sx={{position: 'absolute', top: 100, left: '50%', transform: 'translate(-50%,-50%)'}}>
					<TimedWatchTutorial
						videoData={videoData}
						tutorialQuestions={tutorialQuestions}
					/>
				</CardActions>
				<Typography
					gutterBottom
					variant="h5"
					component="div">
					{title}
				</Typography>
				<Box sx={{display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center'}}>
					{/* TODO: insert time from fetched Data */}
					07. Jul 23 - 9:00
					<TimedVideoInfo videoData={videoData} />
					<Box sx={{display: 'flex'}}>
						<AssignmentIcon sx={{color: secondary.main}} />
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default TimedTutorialCard;

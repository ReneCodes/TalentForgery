// @ts-ignore
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// Components / Types / Utils
import TimedVideoInfo from './TimedVideoInfo';
import TimedStartWatchTutorial from './TimedStartWatchTutorial';
import {SmallVideoData} from '../../../@types/Types';
import {niceDate, niceTime} from '../../../utils/niceDate';
// Icons
import AssignmentIcon from '@mui/icons-material/Assignment';
import {TutorialStore} from '../../../utils/zustand.store';
import {getQuestions} from '../../../services/Api.service';
import {YellowTooltip, BlackTooltip} from '../../Tooltips/CustomTooltips';

const TimedTutorialCard = ({videoData}: SmallVideoData) => {
	// Zustand Stores
	const {video_thumb_base_url} = TutorialStore();
	//
	const {title, video_thumb, tutorial_id, access_date, due_date} = videoData;
	// Local Stores
	const [tutorialQuestions, setTutorialQuestions] = React.useState([]);
	const [accessDate, setAccessDate] = React.useState<string>();
	const [accessTime, setAccessTime] = React.useState<string>();
	const [niceDueDate, setNiceDueDate] = React.useState<string>();
	const [nicDueTime, setNiceDueTime] = React.useState<string>();
	const [currentDateInMs, setCurrentDateInMs] = React.useState<number>();
	const [accessDateInMs, setAccessDateInMs] = React.useState<number>();

	// console.log('videoData', videoData);

	const createCurrentDate = async () => {
		const milliseconds = Date.now();
		setCurrentDateInMs(milliseconds);
	};

	React.useEffect(() => {
		fetchQuestions();
		createCurrentDate();
	}, []);

	React.useEffect(() => {
		setAccessDate(niceDate(access_date));
		setAccessTime(niceTime(access_date));
		setNiceDueDate(niceDate(due_date));
		setNiceDueTime(niceTime(due_date));
		const date = new Date(access_date);
		const asseccInMS = date.getTime();
		setAccessDateInMs(asseccInMS);
	}, [due_date]);

	function fetchQuestions() {
		getQuestions({tutorial_id}, setTutorialQuestions);
	}

	return (
		<Card sx={{maxWidth: 345, minWidth: 300, position: 'relative', mb: 2}}>
			<CardMedia
				// VIDEO THUMB
				component="img"
				alt={title}
				height="200"
				image={`${video_thumb_base_url}${video_thumb}`}
			/>
			<CardContent>
				<CardActions sx={{position: 'absolute', top: 100, left: '50%', transform: 'translate(-50%,-50%)'}}>
					<TimedStartWatchTutorial
						videoData={videoData}
						tutorialQuestions={tutorialQuestions}
						accessDate={accessDate}
						accessTime={accessTime}
						currentDateInMs={currentDateInMs}
						accessDateInMs={accessDateInMs}
						createCurrentDate={createCurrentDate}
					/>
				</CardActions>
				<Typography
					gutterBottom
					variant="h5"
					component="div"
					sx={{cursor: 'default'}}>
					{title}
				</Typography>

				<Box sx={{display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center'}}>
					<YellowTooltip
						title="Due Date"
						placement="bottom"
						describeChild
						arrow>
						<Typography
							variant="overline"
							sx={{
								cursor: 'default',
								borderBottom: '1px solid',
								borderColor: 'transparent',
								':hover': {borderBottom: '1px solid', borderColor: 'secondary.main'},
							}}>
							{`${niceDueDate} - ${nicDueTime}`}
						</Typography>
					</YellowTooltip>
					<TimedVideoInfo videoData={videoData} />
					<Box sx={{display: 'flex'}}>
						<BlackTooltip
							title="Has Quizz"
							placement="bottom"
							describeChild
							arrow>
							<AssignmentIcon sx={{color: 'secondary.main'}} />
						</BlackTooltip>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default TimedTutorialCard;

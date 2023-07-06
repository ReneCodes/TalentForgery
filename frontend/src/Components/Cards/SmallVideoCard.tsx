// @ts-ignore
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SmallVideoInfo from './SmallVideoInfo';
import SmallVideoDialog from './SmallVideoDialog';
import {TutorialStore} from '../../utils/zustand.store';
import {niceDate, niceTime} from '../../utils/niceDate';
// types
import {SmallVideoData} from '../../@types/Types';
import {YellowTooltip} from '../Tooltips/CustomTooltips';
import {getUsersTutorials, markTutorialAsDone} from '../../services/Api.service';

// Icons
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
interface SmallVideoCardProps {
	videoData: SmallVideoData['videoData'];
}

const SmallVideoCard: React.FC<SmallVideoCardProps> = ({videoData}) => {
	const {video_thumb_base_url, storeUserTutorials} = TutorialStore();
	const [dialogOpen, setDialogOpen] = React.useState(false);
	// TODO: include Topic
	const {title, video_thumb, access_date, due_date, tags, tutorial_id} = videoData;

	// Local Stores
	const [accessDate, setAccessDate] = React.useState<string>();
	const [accessTime, setAccessTime] = React.useState<string>();
	const [niceDueDate, setNiceDueDate] = React.useState<string>();
	const [niceDueTime, setNiceDueTime] = React.useState<string>();
	const [currentDateInMs, setCurrentDateInMs] = React.useState<number>();
	const [accessDateInMs, setAccessDateInMs] = React.useState<number>();
	const [dueDateInMs, setDueDateInMs] = React.useState<number>();

	React.useEffect(() => {
		setAccessDate(niceDate(access_date));
		setAccessTime(niceTime(access_date));
		setNiceDueDate(niceDate(due_date));
		setNiceDueTime(niceTime(due_date));
		const access = new Date(access_date);
		const accessInMS = access.getTime();
		setAccessDateInMs(accessInMS);
		const due = new Date(due_date);
		const dueInMS = due.getTime();
		setDueDateInMs(dueInMS);
		const milliseconds = Date.now();
		setCurrentDateInMs(milliseconds);
	}, [due_date]);

	const createCurrentDate = async () => {
		const milliseconds = Date.now();
		setCurrentDateInMs(milliseconds);
	};

	const markAsDone = async () => {
		await getUsersTutorials(storeUserTutorials);
		markTutorialAsDone({tutorial_id});
	};

	return (
		<Card sx={{maxWidth: 345, minWidth: 300, position: 'relative', mb: 2}}>
			{dialogOpen && (
				<SmallVideoDialog
					dialogOpen={dialogOpen}
					setDialogOpen={setDialogOpen}
					videoData={videoData}
					markAsDone={markAsDone}
				/>
			)}
			<CardMedia
				component="img"
				alt={title}
				height="200"
				image={`${video_thumb_base_url}${video_thumb}`}
			/>
			<CardContent>
				<CardActions sx={{position: 'absolute', top: 100, left: '50%', transform: 'translate(-50%,-50%)'}}>
					{accessDateInMs && currentDateInMs && accessDateInMs <= currentDateInMs ? (
						<Button
							variant="contained"
							sx={styles.access_btn}
							aria-label="Start Video"
							onClick={() => setDialogOpen(true)}>
							Play Video
						</Button>
					) : dueDateInMs && currentDateInMs && dueDateInMs <= currentDateInMs ? (
						<YellowTooltip
							title="Click to Remove Card"
							placement="bottom"
							describeChild
							arrow>
							<Button
								variant="contained"
								aria-label="no access yet"
								onClick={markAsDone}
								sx={styles.over_due}>
								<Typography>{`Missed Deadline`}</Typography>
								<Typography>{`${niceDueDate} - ${niceDueTime}`}</Typography>
							</Button>
						</YellowTooltip>
					) : (
						<YellowTooltip
							title="Click to Check Time"
							placement="bottom"
							describeChild
							arrow>
							<Button
								variant="contained"
								aria-label="no access yet"
								sx={styles.access_denied_btn}
								onClick={createCurrentDate}>
								<Typography>{`Unlocked at`}</Typography>
								<Typography>{`${accessDate} - ${accessTime}`}</Typography>
							</Button>
						</YellowTooltip>
					)}
				</CardActions>
				<Typography
					gutterBottom
					variant="h5"
					component="div">
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
							{`${niceDueDate} - ${niceDueTime}`}
						</Typography>
					</YellowTooltip>
					<SmallVideoInfo
						videoData={videoData}
						accessTime={accessTime}
						accessDate={accessDate}
						niceDueTime={niceDueTime}
						niceDueDate={niceDueDate}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};

export default SmallVideoCard;

/** @type {import("@mui/material").SxProps} */
const styles = {
	quizz_done: {
		display: 'flex',
		flexDirection: 'column',
		gap: 2,
		justifyContent: 'center',
		textAlign: 'center',
		mx: 3,
		width: {xs: '100%', sm: '500px', md: '600px'},
		minWidth: '300px',
		height: '100%',
		minHeight: '400px',
		p: 3,
	},
	access_btn: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'white.main',
		color: 'gray.900',
		':hover': {
			backgroundColor: 'secondary.main',
		},
	},
	access_denied_btn: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'gray.900',
		color: 'white.main',
		':hover': {
			backgroundColor: 'green.900',
		},
	},
	over_due: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'red.900',
		color: 'white.main',
		':hover': {
			backgroundColor: 'gray.900',
		},
	},
};

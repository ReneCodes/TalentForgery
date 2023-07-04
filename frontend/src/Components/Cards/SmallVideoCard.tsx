// @ts-ignore
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import theme from '../../config/theme';
import SmallVideoInfo from './SmallVideoInfo';
import SmallVideoDialog from './SmallVideoDialog';
import {TutorialStore} from '../../utils/zustand.store';
// types
import {SmallVideoData} from '../../@types/Types';

// Icons
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
interface SmallVideoCardProps {
	videoData: SmallVideoData['videoData'];
}

const SmallVideoCard: React.FC<SmallVideoCardProps> = ({videoData}) => {
	const {video_thumb_base_url} = TutorialStore();
	const {white, secondary, gray} = theme.palette;
	const [dialogOpen, setDialogOpen] = React.useState(false);
	// TODO: include Topic
	const {video_thumb, title} = videoData;
	return (
		<Card sx={{maxWidth: 345, minWidth: 300, position: 'relative', mb: 2}}>
			{dialogOpen && (
				<SmallVideoDialog
					dialogOpen={dialogOpen}
					setDialogOpen={setDialogOpen}
					videoData={videoData}
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
					<Button
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
						Play Video
					</Button>
				</CardActions>
				<Typography
					gutterBottom
					variant="h5"
					component="div">
					{title}
				</Typography>
				<Box sx={{display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center'}}>
					{/* <Typography
						variant="overline"
						color={gray['700']}>
						{topic} 
					</Typography> */}
					<SmallVideoInfo videoData={videoData} />
				</Box>
			</CardContent>
		</Card>
	);
};

export default SmallVideoCard;

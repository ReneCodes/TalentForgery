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
import VideoDialog from './VideoDialog';
// Icons

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VideoInfo from './VideoInfo';
import {VideoDataT} from '../../utils/types';

export default function SmallVideoCard({videoData}: VideoDataT) {
	const {white, secondary, gray, green} = theme.palette;
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const {thumbnail, watched, has_form, topic, from_done, title} = videoData;
	return (
		<Card sx={{maxWidth: 345, minWidth: 300, position: 'relative'}}>
			{dialogOpen && (
				<VideoDialog
					dialogOpen={dialogOpen}
					setDialogOpen={setDialogOpen}
					videoData={videoData}
				/>
			)}
			<CardMedia
				component="img"
				alt={title}
				height="200"
				image={thumbnail}
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
					<Typography
						variant="overline"
						color={gray['700']}>
						{topic}
					</Typography>
					<VideoInfo videoData={videoData} />
					<Box sx={{display: 'flex'}}>
						{watched && <CheckCircleIcon sx={{color: green.main, mr: 1}} />}
						{has_form ? (
							<Box>
								{from_done ? (
									<AssignmentTurnedInIcon sx={{color: green['900']}} />
								) : (
									<AssignmentIcon sx={{color: secondary.main}} />
								)}
							</Box>
						) : null}
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

// const style = {
// 	flexDirection: 'column',
// } as const;

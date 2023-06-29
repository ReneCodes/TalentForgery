import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import theme from '../../config/theme';
// icons
import {Box, DialogActions, DialogContent} from '@mui/material';
import React from 'react';
import {TutorialVideoDataType} from '../../@types/Types';

interface TotorialVideoProps {
	videoData: TutorialVideoDataType;
	setVideoWatched: React.Dispatch<React.SetStateAction<boolean>>;
}

const TotorialVideo: React.FC<TotorialVideoProps> = ({videoData, setVideoWatched}) => {
	const {secondary, gray} = theme.palette;

	return (
		<Box sx={{maxWidth: '95%', margin: 'auto'}}>
			<DialogContent sx={{width: 'fit-content', maxWidth: '1000px', margin: 'auto', textAlign: 'center'}}>
				<Box sx={{overflow: 'hidden', m: 2}}>
					<video
						width="100%"
						height="auto"
						muted={false}
						style={{borderRadius: '10px'}}
						controls
						className="watchTutorial_video">
						<source
							src={videoData.source}
							type="video/mp4"></source>
						Your Browser does not support this video tag
					</video>
				</Box>
				<Box>
					<Typography variant="overline">{videoData.description}</Typography>
				</Box>
				<DialogActions>
					<Button
						variant="contained"
						sx={{
							backgroundColor: secondary.main,
							color: gray[900],
							py: 1,
							px: 3,
							':hover': {
								backgroundColor: secondary[900],
							},
						}}
						onClick={() => setVideoWatched(true)}
						autoFocus>
						Answer Questions
					</Button>
				</DialogActions>
			</DialogContent>
		</Box>
	);
};

export default TotorialVideo;

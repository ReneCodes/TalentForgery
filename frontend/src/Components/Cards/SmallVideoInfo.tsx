import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../../config/theme';
// types
import {SmallVideoData} from '../../@types/Types';
import {Box, Divider, Typography} from '@mui/material';

interface SmallVideoInfoProps {
	videoData: SmallVideoData['videoData'];
	accessTime: string | undefined;
	accessDate: string | undefined;
	niceDueTime: string | undefined;
	niceDueDate: string | undefined;
}

export default function SmallVideoInfo({
	videoData,
	accessTime,
	accessDate,
	niceDueTime,
	niceDueDate,
}: SmallVideoInfoProps) {
	const [open, setOpen] = React.useState(false);
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const {title, description, tags} = videoData;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="text"
				size="small"
				onClick={handleClickOpen}>
				Details
			</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="tutorial details"
				sx={{textAlign: 'center'}}>
				<DialogTitle
					id="tutorial details"
					variant="h4">
					{title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText variant="overline">{description}</DialogContentText>
					<Divider sx={{width: '50%', m: 'auto'}} />

					<Box sx={{}}>
						{tags &&
							tags.map((tag) => (
								<Typography
									key={tag}
									variant="overline"
									color={'primary.main'}
									sx={{
										mx: 1,
										backgroundColor: 'primary.main',
										color: 'white.main',
										px: 1,
										py: '3px',
										borderRadius: '4px',
									}}>
									{tag}
								</Typography>
							))}
					</Box>
					<Typography
						variant="overline"
						sx={{borderBottom: '2px solid', borderColor: 'green.900', px: 1, pb: '3px'}}>
						Access :
					</Typography>
					<Typography variant="overline">
						{' '}
						{accessDate} - {accessTime}{' '}
					</Typography>
					<Typography
						variant="overline"
						sx={{borderBottom: '2px solid', borderColor: 'red.900', px: 1, pb: '3px'}}>
						Due By:
					</Typography>
					<Typography variant="overline">
						{' '}
						{niceDueDate} - {niceDueTime}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						aria-label="close"
						onClick={handleClose}
						sx={{
							backgroundColor: 'gray.700',
							color: 'white.main',
							':hover': {
								backgroundColor: 'gray.900',
							},
						}}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

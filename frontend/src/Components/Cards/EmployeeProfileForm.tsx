import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from 'react-hook-form';
import {UpdateProfile} from '../../@types/Types';
import {ImageListItem, TextField, Box, Stack, Avatar, Typography} from '@mui/material';
import {getSingleUserProfileData, updateProfileData} from '../../services/Api.service';
// Icons
import theme from '../../config/theme';
import {userProfileStore} from '../../utils/zustand.store';

export default function EmployeeProfileForm() {
	const {avatar_url_path, localProfileInfo, UpdateProfileInfo} = userProfileStore();
	let avatarPath = avatar_url_path;
	// Local States
	const [open, setOpen] = React.useState(false);
	const [readOnly, setReadOnly] = React.useState(true);
	const [file, setFile] = React.useState<File>({} as File);
	const [updateError, setUpdateError] = React.useState('');
	// Collor Theme
	const {secondary, gray, white, red, green} = theme.palette;

	React.useEffect(() => {
		// console.log('local userProfile', userProfile);
	}, [localProfileInfo]);

	// React hook Form
	const updateProfile = useForm<UpdateProfile>({
		defaultValues: async () => {
			try {
				const response = await getSingleUserProfileData();
				const profileData: UpdateProfile = response.data;
				// console.log('fetched profileData', profileData);
				storeUserProfileData(profileData);
				return profileData;
			} catch (error: any) {
				alert('No Profile data found on Server');
				return localProfileInfo;
			}
		},
	});

	function storeUserProfileData(profileData: UpdateProfile) {
		UpdateProfileInfo(profileData);
	}

	const {reset, register, handleSubmit, formState} = updateProfile;
	const {errors} = formState;

	const handleUpdate = async (formData: UpdateProfile) => {
		const updateUserAnswer = await updateProfileData(formData);
		storeUserProfileData(formData);

		// handle error
		if (updateUserAnswer.response) {
			if (updateUserAnswer.response.status >= 300) {
				const errorMsg: string = updateUserAnswer.response.data;
				setUpdateError(errorMsg);
			}
			reset(localProfileInfo);
		} else {
			if (readOnly) setReadOnly(false);
			else setReadOnly(true);
		}
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const getFiles = e.target.files;
		if (getFiles?.length) {
			setFile(getFiles[0]);
		}
	};

	const handleWriteAccess = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (readOnly) setReadOnly(false);
		else {
			setReadOnly(true);
			setFile({} as File);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
		if (readOnly) setReadOnly(false);
		else setReadOnly(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="outlined"
				onClick={handleClickOpen}>
				Open form dialog
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle variant="h5">Pofile Info</DialogTitle>
				<DialogContent>
					<form
						onSubmit={handleSubmit(handleUpdate)}
						className="page">
						<Stack>
							<Box
								display="flex"
								mb={1}>
								<ImageListItem sx={{maxWidth: 100, maxHeight: 100, width: 100, height: 100, p: 1, borderRadius: 999}}>
									{file.name ? (
										<Avatar
											sx={styles.avatar}
											alt="profile image"
											src={file.name && URL.createObjectURL(file)}></Avatar>
									) : (
										<Avatar
											sx={styles.avatar}
											alt="profile image"
											src={
												localProfileInfo.profile_picture
													? (avatarPath += localProfileInfo.profile_picture)
													: 'src/assets/default_user.png'
											}></Avatar>
									)}
								</ImageListItem>
								<TextField
									disabled={readOnly}
									type="file"
									error={!!errors.profile_picture}
									variant="standard"
									helperText={'Profile picture'}
									aria-label="profile picture input-field"
									aria-invalid={errors.profile_picture ? 'true' : 'false'}
									{...register('profile_picture', {
										onChange: (e) => handleFileInput(e),
									})}
									sx={{width: '100%', maxWidth: '250px', height: 100, px: 1, py: 2}}
								/>
							</Box>

							<TextField
								disabled={readOnly}
								error={!!errors.first_name}
								helperText={errors.first_name ? errors.first_name?.message : ' '}
								label="First Name"
								variant="outlined"
								aria-label="name input-field"
								aria-invalid={errors.first_name ? 'true' : 'false'}
								{...register('first_name', {
									required: 'A firstname is required',
								})}
							/>
							<TextField
								disabled={readOnly}
								error={!!errors.last_name}
								helperText={errors.last_name ? errors.last_name?.message : ' '}
								label="Last Name"
								variant="outlined"
								aria-label="name input-field"
								aria-invalid={errors.last_name ? 'true' : 'false'}
								{...register('last_name', {
									required: 'A lastname is required',
								})}
							/>
							<TextField
								disabled={readOnly}
								helperText={errors.email ? errors.email?.message : ' '}
								margin="dense"
								id="email"
								label="Email Address"
								type="email"
								variant="outlined"
								aria-label="email input-field"
								{...register('email', {
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@+[a-zA-Z0-9]+\.+([a-z.]+){2,}$/,
										message: 'Not a valid email',
									},
									required: {
										value: true,
										message: 'Your email is required',
									},
								})}
							/>
							<TextField
								disabled={readOnly}
								error={!!errors.personal_email}
								helperText={errors.personal_email ? errors.personal_email?.message : ' '}
								label="Personal Email - Optional"
								type="email"
								variant="outlined"
								aria-label="personal email optional"
								aria-invalid={errors.personal_email ? 'true' : 'false'}
								{...register('personal_email', {
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@+[a-zA-Z0-9]+\.+([a-z.]+){2,}$/,
										message: 'Not a valid email',
									},
								})}
							/>
							<TextField
								disabled={readOnly}
								error={!!errors.phone}
								helperText={errors.phone ? errors.phone?.message : ' '}
								label="Phone Number - Optional"
								variant="outlined"
								// inputProps={{inputMode: 'numeric', pattern: '[+0-9]*'}}
								aria-label="phone number optional"
								aria-invalid={errors.phone ? 'true' : 'false'}
								{...register('phone', {
									pattern: {
										value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
										message: 'Not a valid phonenumber',
									},
								})}
							/>
							{updateError ? (
								<Typography
									textAlign={'right'}
									px={1}
									color={red.main}>
									{updateError}
								</Typography>
							) : (
								<Typography visibility={'hidden'}>{'no error'}</Typography>
							)}
						</Stack>

						<DialogActions>
							{/* If Update Form => Update goes Save | Close goes Cancel */}
							{readOnly ? (
								<Button
									type="button"
									aria-label="update profile"
									variant="contained"
									onClick={handleWriteAccess}
									sx={{
										backgroundColor: secondary.main,
										color: gray[900],
										':hover': {
											backgroundColor: secondary[900],
										},
									}}>
									Update
								</Button>
							) : (
								<Button
									type="submit"
									variant="contained"
									aria-label="save profile update"
									sx={{
										backgroundColor: green.main,
										color: white.main,
										':hover': {
											backgroundColor: green[800],
										},
									}}>
									Save
								</Button>
							)}
							{readOnly ? (
								<Button
									aria-label="close profile view"
									variant="contained"
									onClick={handleClose}
									sx={{
										backgroundColor: gray[700],
										':hover': {
											backgroundColor: gray[900],
										},
									}}>
									Close
								</Button>
							) : (
								<Button
									aria-label="cancel update"
									variant="contained"
									onClick={handleWriteAccess}
									sx={{
										backgroundColor: red.main,
										color: white.main,
										':hover': {
											backgroundColor: red[900],
										},
									}}>
									Cancel
								</Button>
							)}
						</DialogActions>
					</form>
				</DialogContent>
				<DialogContentText></DialogContentText>
			</Dialog>
		</div>
	);
}

/** @type {import("@mui/material").SxProps} */
const styles = {
	avatarContainer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		my: 5,
	},
	avatar: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		border: 3,
		borderColor: 'gray.900',
		backgrondColor: 'red.main',
	},
	department: {
		mt: 1,
	},
};

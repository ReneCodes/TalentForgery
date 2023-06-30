import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from 'react-hook-form';
import {UpdateProfile, UserProfile} from '../../@types/Types';
import {ImageListItem, TextField, Box, Stack, Avatar} from '@mui/material';
// Icons
import theme from '../../config/theme';

// TODO: should comes from DB
const MockUser = {
	user_id: 'random2345678900987654',
	profile_image: {url: 'src/assets/bob_minion.png'} as UserProfile,
	first_name: 'Bobi',
	last_name: 'Jonson',
	email: 'bob@mail.com',
	department: 'finance',
	personal_email: '',
	phone: '',
};

export default function EmployeeProfileForm() {
	const [open, setOpen] = React.useState(false);
	const [readOnly, setReadOnly] = React.useState(true);
	const {secondary, gray, white, red, green} = theme.palette;

	const [file, setFile] = React.useState<File>({} as File); // TODO: inital shuld be profile image

	// React hook Form
	const updateProfile = useForm<UpdateProfile>({
		defaultValues: MockUser,
	});

	const {register, handleSubmit, formState} = updateProfile;
	const {errors} = formState;

	const handleUpdate = (formData: UpdateProfile) => {
		console.log('Update Profile Banana', formData);
		// TODO: API Update Profile
		// Wait for return Okay or Error
		if (readOnly) setReadOnly(false);
		else setReadOnly(true);
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
		else setReadOnly(true);
	};

	const handleClickOpen = () => {
		setOpen(true);
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
								<ImageListItem sx={{width: 100, height: 100, borderRadius: 999}}>
									{file.name ? (
										<img
											src={file.name && URL.createObjectURL(file)}
											alt=""
											loading="lazy"
										/>
									) : (
										<Avatar
											sx={styles.avatar}
											alt="profile image"
											src={MockUser.profile_image.url}></Avatar>
										// <FaceIcon sx={{width: 90, height: 90}} />
									)}
								</ImageListItem>
								<TextField
									disabled={readOnly}
									type="file"
									error={!!errors.profile_image}
									variant="standard"
									helperText={'Profile picture'}
									aria-label="profile picture input-field"
									aria-invalid={errors.profile_image ? 'true' : 'false'}
									{...register('profile_image', {
										onChange: (e) => handleFileInput(e),
									})}
									sx={{width: '70%', height: 100, px: 1, py: 2}}
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
								error={!!errors.department}
								helperText={errors.department ? errors.department?.message : ' '}
								label="Department"
								variant="outlined"
								aria-label="department input-field"
								aria-invalid={errors.department ? 'true' : 'false'}
								{...register('department', {
									required: {
										value: true,
										message: 'A department is required',
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
		width: '40%',
		height: 'auto',
		border: 3,
		borderColor: 'primary.main',
	},
	department: {
		mt: 1,
	},
};

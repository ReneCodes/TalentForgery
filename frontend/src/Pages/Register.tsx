// @ts-ignore
import React, {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useForm} from 'react-hook-form';
import {Box, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, ImageListItem} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import FaceIcon from '@mui/icons-material/Face';
import {Navigate} from 'react-router';
import {registerUser} from '../services/Api.service';
// import './register.css';

type RegisterFormValues = {
	profile_image: File;
	first_name: string;
	last_name: string;
	email: string;
	department: string;
	password: string;
	confirmPassword: string;
	personal_email: string;
	phone: string;
};

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [registerError, setRegisterError] = useState('');
	const [file, setFile] = useState<File>({} as File);

	const registerForm = useForm<RegisterFormValues>({
		defaultValues: {
			profile_image: {} as File,
			first_name: '',
			last_name: '',
			email: '',
			department: '',
			password: '',
			confirmPassword: '',
			personal_email: '',
			phone: '',
		},
	});

	const {register, handleSubmit, formState, reset} = registerForm;
	const {errors} = formState;

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handlePasswordCheck = (password: string, confirmPassword: string) => {
		if (password !== confirmPassword) {
			alert("passwords don't match");
			return false;
		} else if (password.length < 8) {
			alert('password must be 8 character or more');
			return false;
		} else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(password)) {
			alert('password must be a mix of alphanumeric characters');
			return false;
		}
		return true;
	};

	const handleRegister = async (formData: RegisterFormValues) => {
		const checkPassword = handlePasswordCheck(formData.password, formData.confirmPassword);

		if (checkPassword) {
			const requestAnswer = await registerUser(formData);
			// console.log(formData);
			if (requestAnswer) setRegisterError(requestAnswer);
			else {
				reset({
					profile_image: {} as File,
					first_name: '',
					last_name: '',
					email: '',
					department: '',
					personal_email: '',
					password: '',
					confirmPassword: '',
					phone: '',
				});
				<Navigate to={'/home'} />;
			}
		}
	};

	const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		const getFiles = e.target.files;
		if (getFiles?.length) {
			setFile(getFiles[0]);
		}
	};

	return (
		<Container
			maxWidth="xs"
			sx={{height: '100%', mb: 8}}>
			<Container
				maxWidth="xs"
				sx={{backgroundColor: 'inherit'}}>
				<h1>Minon Mentor</h1>
			</Container>
			<Container
				maxWidth="xs"
				sx={{pb: 8, pt: 3, boxShadow: 3, borderRadius: 2}}>
				<h2>Register</h2>
				{registerError && (
					<Box
						color="red"
						my={1}>
						{registerError}
					</Box>
				)}
				<form
					onSubmit={handleSubmit(handleRegister)}
					className="page">
					<Stack
						spacing={1}
						width={'90%'}
						margin={'auto'}>
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
									<FaceIcon sx={{width: 90, height: 90}} />
								)}
							</ImageListItem>
							<TextField
								type="file"
								error={!!errors.profile_image}
								helperText={errors.profile_image ? errors.profile_image?.message : 'Profile picture optional'}
								variant="standard"
								aria-label="profile picture input-field"
								aria-invalid={errors.profile_image ? 'true' : 'false'}
								{...register('profile_image', {
									onChange: (e) => handleFileInput(e),
								})}
								sx={{width: '70%', height: 100, px: 1, py: 2}}
							/>
						</Box>

						<TextField
							error={!!errors.first_name}
							helperText={errors.first_name ? errors.first_name?.message : ' '}
							label="First Name"
							variant="outlined"
							aria-label="name input-field"
							aria-invalid={errors.first_name ? 'true' : 'false'}
							{...register('first_name', {
								required: 'Your firstname is required',
							})}
						/>
						<TextField
							error={!!errors.last_name}
							helperText={errors.last_name ? errors.last_name?.message : ' '}
							label="Last Name"
							variant="outlined"
							aria-label="name input-field"
							aria-invalid={errors.last_name ? 'true' : 'false'}
							{...register('last_name', {
								required: 'Your lastname is required',
							})}
						/>
						<TextField
							error={!!errors.email}
							helperText={errors.email ? errors.email?.message : ' '}
							label="Email"
							type="email"
							variant="outlined"
							aria-label="name input-field"
							aria-invalid={errors.email ? 'true' : 'false'}
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
							error={!!errors.department}
							helperText={errors.department ? errors.department?.message : ' '}
							label="Department"
							variant="outlined"
							aria-label="department input-field"
							aria-invalid={errors.department ? 'true' : 'false'}
							{...register('department', {
								required: {
									value: true,
									message: 'Your department is required',
								},
							})}
						/>
						<FormControl
							error={!!errors.password}
							fullWidth
							// variant="outlined"
						>
							<InputLabel htmlFor="password-field">Password</InputLabel>

							<OutlinedInput
								id="password-field"
								type={showPassword ? 'text' : 'password'}
								minLength={8}
								label="Password"
								aria-label="password input-field"
								aria-invalid={errors.password ? 'true' : 'false'}
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Must be 8 character or more',
									},
									pattern: {
										value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
										message: 'Must contain upper & lowercase letter + numbers',
									},
								})}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end">
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
							<Stack>
								<FormHelperText>{errors.password ? errors.password?.message : 'Minimun 8 Characters.'}</FormHelperText>

								<FormHelperText>{errors.password ? '' : 'Must contain lower and uppercase letters'}</FormHelperText>
							</Stack>
						</FormControl>

						<TextField
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword ? errors.confirmPassword?.message : ' '}
							label="Confirm Password"
							variant="outlined"
							type={showPassword ? 'text' : 'password'}
							minLength={8}
							aria-label="confirmPassword input-field"
							aria-invalid={errors.confirmPassword ? 'true' : 'false'}
							{...register('confirmPassword', {
								required: 'Password does not match',
							})}
						/>
						<TextField
							error={!!errors.personal_email}
							helperText={errors.personal_email ? errors.personal_email?.message : ' '}
							label="Secondary Email - Optional"
							type="email"
							variant="outlined"
							aria-label="second email optional"
							aria-invalid={errors.personal_email ? 'true' : 'false'}
							{...register('personal_email', {
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@+[a-zA-Z0-9]+\.+([a-z.]+){2,}$/,
									message: 'Not a valid email',
								},
							})}
						/>
						<TextField
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
						<Button
							type="submit"
							variant="contained"
							aria-label="register now">
							Register Now
						</Button>
					</Stack>
				</form>
			</Container>
		</Container>
	);
};

export default Register;

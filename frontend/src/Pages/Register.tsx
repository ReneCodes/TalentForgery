// @ts-ignore
import React, {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import theme from '../config/theme';
import TextField from '@mui/material/TextField';
import {useForm} from 'react-hook-form';
import {
	Box,
	Input,
	Container,
	Typography,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	Stack,
	ImageListItem,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import FaceIcon from '@mui/icons-material/Face';

import { Navigate } from 'react-router';
import { registerUser } from '../services/Api.service';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { LoginAndOut } from '../utils/zustand.store';


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
	const {white, secondary, gray, primary} = theme.palette;
	const [showPassword, setShowPassword] = useState(false);
	const [registerError, setRegisterError] = useState('');
	const [file, setFile] = useState<File>({} as File);
	const navigate: NavigateFunction = useNavigate();
	const { MinonLogin } = LoginAndOut();

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
			const requestAnswer = await registerUser(formData, navigate);
			if (requestAnswer) setRegisterError(requestAnswer);
			else {
				MinonLogin();
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
		<Container sx={{height: {xs: 'max-content', sm: 'max-content', md: '100vh'}, py: 2}}>
			<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<Button
					variant="text"
					sx={{
						':hover': {
							backgroundColor: 'transparent',
						},
					}}
					onClick={() => navigate('/')}>
					{
						<Box
							display="flex"
							gap={1}>
							<Typography
								sx={{color: secondary.main, fontSize: '24px'}}
								variant="overline">
								Minon
							</Typography>
							<Typography
								sx={{color: primary.main, fontSize: '24px'}}
								variant="overline">
								Mentor
							</Typography>
						</Box>
					}
				</Button>

				<Button
					onClick={() => navigate('/login')}
					sx={{
						width: {xs: '100px', sm: '100px', md: '170px'},
						height: '50px',
						marginLeft: 'auto',
						backgroundColor: secondary.main,
						color: gray[900],
						':hover': {
							backgroundColor: secondary[900],
						},
					}}>
					<Typography sx={{variant: {xs: 'h4', sm: 'h6', md: 'h6'}}}>Login</Typography>
				</Button>
			</Box>

			<Container sx={{my: 3, py: 3, boxShadow: 10, borderRadius: 5}}>
				<Typography
					variant="h4"
					sx={{fontWeight: 'bold'}}>
					Register
				</Typography>

				<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<Typography variant="h5">
						<span style={{color: 'red'}}>
							{registerError ? (
								<Box
									color="red"
									my={1}>
									{registerError}
								</Box>
							) : (
								<Box
									color="red"
									my={1}
									visibility={'hidden'}>
									{'error'}
								</Box>
							)}
						</span>
					</Typography>
				</Box>

				<form
					onSubmit={handleSubmit(handleRegister)}
					className="page">
					<Stack
						spacing={1}
						width={'100%'}
						margin={'auto'}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: {xs: 'column', sm: 'column', md: 'row'},
								justifyContent: 'center',
								alignItems: {xs: 'start', sm: 'center', md: 'center'},
							}}>
							<TextField
								error={!!errors.first_name}
								helperText={errors.first_name ? errors.first_name?.message : ' '}
								sx={{
									width: {xs: '300px', sm: '300px', md: '500px'},
									m: {xs: 'auto', sm: 'auto', md: '20px 40px'},
									order: {xs: '2', sm: '2', md: '2'},
								}}
								label="First Name"
								variant="standard"
								aria-label="name input-field"
								aria-invalid={errors.first_name ? 'true' : 'false'}
								{...register('first_name', {
									required: 'Your first name is required',
								})}
							/>

							<Box
								display="flex"
								sx={{m: {xs: 'auto', sm: 'auto', md: '-10px'}, order: {xs: '1', sm: '1', md: '2'}}}>
								<label htmlFor="profile_image">
									<ImageListItem sx={{width: 100, height: 100, borderRadius: 999}}>
										{file.name ? (
											<img
												style={{width: '100px', height: '100px', borderRadius: '999px'}}
												src={URL.createObjectURL(file)}
												alt=""
												loading="lazy"
											/>
										) : (
											<FaceIcon sx={{width: 90, height: 90}} />
										)}
									</ImageListItem>
								</label>

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
									id="profile_image"
									sx={{width: '100%', height: 100, px: 1, py: 2, display: 'none'}}
								/>
							</Box>

							<TextField
								error={!!errors.last_name}
								helperText={errors.last_name ? errors.last_name?.message : ' '}
								sx={{
									width: {xs: '300px', sm: '300px', md: '470px'},
									m: {xs: 'auto', sm: 'auto', md: '20px 40px'},
									order: {xs: '3', sm: '3', md: '3'},
								}}
								label="Last Name"
								variant="standard"
								aria-label="name input-field"
								aria-invalid={errors.last_name ? 'true' : 'false'}
								{...register('last_name', {
									required: 'Your last name is required',
								})}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: {xs: 'column', sm: 'column', md: 'row'},
								justifyContent: 'start',
								alignItems: 'center',
								gap: {xs: '10px', sm: '10px', md: '110px'},
							}}>
							<TextField
								error={!!errors.email}
								helperText={errors.email ? errors.email?.message : ' '}
								sx={{
									width: {xs: '300px', sm: '300px', md: '470px'},
									m: {xs: 'auto', sm: 'auto', md: 'auto 0 auto 40px'},
								}}
								label="Email"
								type="email"
								variant="standard"
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
								sx={{
									width: {xs: '300px', sm: '300px', md: '470px'},
									m: {xs: 'auto', sm: 'auto', md: 'auto 20px auto 0'},
								}}
								label="Department"
								variant="standard"
								aria-label="department input-field"
								aria-invalid={errors.department ? 'true' : 'false'}
								{...register('department', {
									required: {
										value: true,
										message: 'Your department is required',
									},
								})}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: {xs: 'column', sm: 'column', md: 'row'},
								justifyContent: 'center',
								alignItems: 'center',
								gap: {xs: '10px', sm: '10px', md: '110px'},
							}}>
							<FormControl
								error={!!errors.password}
								sx={{
									width: {xs: '300px', sm: '300px', md: '470px'},
									m: {xs: 'auto', sm: 'auto', md: 'auto 0 auto 40px'},
								}}
								variant="standard">
								<InputLabel htmlFor="password-field">Password</InputLabel>

								<Input
									id="password-field"
									type={showPassword ? 'text' : 'password'}
									minLength={8}
									placeholder="Password"
									aria-label="password input-field"
									aria-invalid={errors.password ? 'true' : 'false'}
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 8,
											message: 'Must be 8 characters or more',
										},
										pattern: {
											value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
											message: 'Must contain upper & lowercase letters and numbers',
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
									<FormHelperText>
										{errors.password ? errors.password?.message : 'Minimun 8 Characters.'}
									</FormHelperText>

									<FormHelperText>{errors.password ? '' : 'Must contain lower and uppercase letters'}</FormHelperText>
								</Stack>
							</FormControl>

							<TextField
								sx={{width: {xs: '300px', sm: '300px', md: '470px'}, m: {xs: 'auto', sm: 'auto', md: '0 20px auto 0'}}}
								error={!!errors.confirmPassword}
								helperText={errors.confirmPassword ? errors.confirmPassword?.message : ' '}
								label="Confirm Password"
								variant="standard"
								type={showPassword ? 'text' : 'password'}
								minLength={8}
								aria-label="confirmPassword input-field"
								aria-invalid={errors.confirmPassword ? 'true' : 'false'}
								{...register('confirmPassword', {
									required: 'Password does not match',
								})}
							/>
						</Box>

						<Box
							sx={{
								gap: {xs: '10px', sm: '10px', md: '110px'},
								display: 'flex',
								flexDirection: {xs: 'column', sm: 'column', md: 'row'},
								justifyContent: 'start',
								alignItems: 'center',
							}}>
							<TextField
								error={!!errors.personal_email}
								helperText={errors.personal_email ? errors.personal_email?.message : ' '}
								sx={{
									width: {xs: '300px', sm: '300px', md: '470px'},
									m: {xs: 'auto', sm: 'auto', md: 'auto 0 auto 40px'},
								}}
								label="Secondary Email - Optional"
								type="email"
								variant="standard"
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
								sx={{
									width: {xs: '300px', sm: '300px', md: '470px'},
									m: {xs: 'auto', sm: 'auto', md: 'auto 20px auto 0'},
								}}
								variant="standard"
								aria-label="phone number optional"
								aria-invalid={errors.phone ? 'true' : 'false'}
								{...register('phone', {
									pattern: {
										value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
										message: 'Not a valid phone number',
									},
								})}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: {xs: 'column', sm: 'column', md: 'row'},
								justifyContent: 'start',
								alignItems: 'center',
							}}>
							<Button
								type="submit"
								sx={{
									width: '200px',
									height: '50px',
									margin: 'auto',
									backgroundColor: primary.main,
									color: white.main,
									fontWeight: 'bold',
								}}
								variant="contained"
								aria-label="register now">
								Register Now
							</Button>
						</Box>
					</Stack>
				</form>
			</Container>
		</Container>
	);
};

export default Register;

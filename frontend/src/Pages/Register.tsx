// @ts-ignore
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useForm} from 'react-hook-form';
import {Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
// import './register.css';

type RegisterFormValues = {
	firstName: string;
	lastname: string;
	email: string;
	secondEmail: string;
	password: string;
	confirmPassword: string;
	phoneNumber: string;
};

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const registerForm = useForm<RegisterFormValues>({
		defaultValues: {
			firstName: '',
			lastname: '',
			email: '',
			secondEmail: '',
			password: '',
			confirmPassword: '',
			phoneNumber: '',
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

	const handleRegister = (data: RegisterFormValues) => {
		// event.preventDefault();
		const checkPassword = handlePasswordCheck(data.password, data.confirmPassword);

		if (checkPassword) {
			console.log(data);
			reset({
				firstName: '',
				lastname: '',
				email: '',
				secondEmail: '',
				password: '',
				confirmPassword: '',
				phoneNumber: '',
			});
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
				<form
					onSubmit={handleSubmit(handleRegister)}
					className="page">
					<Stack
						spacing={3}
						width={'90%'}
						margin={'auto'}>
						<TextField
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
							className="input"
							label="First Name"
							variant="outlined"
							aria-label="name input-field"
							aria-invalid={errors.firstName ? 'true' : 'false'}
							{...register('firstName', {
								required: 'Your Firstname is required',
							})}
						/>
						<TextField
							error={!!errors.lastname}
							helperText={errors.lastname?.message}
							className="input"
							label="Last Name"
							variant="outlined"
							aria-label="name input-field"
							aria-invalid={errors.lastname ? 'true' : 'false'}
							{...register('lastname', {
								required: 'Your Lastname is required',
							})}
						/>
						<TextField
							error={!!errors.email}
							helperText={errors.email?.message}
							className="input"
							label="Email"
							type="email"
							variant="outlined"
							aria-label="name input-field"
							aria-invalid={errors.email ? 'true' : 'false'}
							{...register('email', {
								required: 'Your Email is required',
							})}
						/>
						<FormControl
							error={!!errors.password}
							fullWidth
							variant="outlined">
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
							helperText={errors.confirmPassword?.message}
							className="input"
							label="Confirm Password"
							variant="outlined"
							type={showPassword ? 'text' : 'password'}
							minLength={8}
							aria-label="confirmPassword input-field"
							aria-invalid={errors.confirmPassword ? 'true' : 'false'}
							{...register('confirmPassword', {
								required: 'Matching Password is required',
							})}
						/>
						<TextField
							className="input"
							label="Secondary Email - Optional"
							type="email"
							variant="outlined"
							aria-label="second email optional"
							aria-invalid={errors.secondEmail ? 'true' : 'false'}
							{...register('secondEmail')}
						/>
						<TextField
							className="input"
							label="Phone Number - Optional"
							variant="outlined"
							inputProps={{inputMode: 'numeric', pattern: '[+0-9]*'}}
							aria-label="phone number optional"
							aria-invalid={errors.phoneNumber ? 'true' : 'false'}
							{...register('phoneNumber')}
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

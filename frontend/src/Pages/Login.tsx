import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Container,
	Input,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	InputAdornment,
	IconButton,
	Button,
	Stack,
	FormHelperText,
	Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { loginUser } from '../services/Api.service';
import { LoginFormValues } from '../@types/Types';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import theme from '../config/theme';
import { LoginAndOut } from '../utils/zustand.store';

const Login: FC = () => {
	const { MinonLogin } = LoginAndOut();

	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState('');
	const navigate: NavigateFunction = useNavigate();

	const loginForm = useForm<LoginFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { register, handleSubmit, formState, reset } = loginForm;
	const { errors } = formState;

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	async function handleLogin(formData: LoginFormValues) {
		const requestAnswer = await loginUser(formData, navigate);

		if (requestAnswer) setLoginError(requestAnswer);
		else {
			MinonLogin();
			reset({
				email: '',
				password: '',
			});
		}
	}

	return (
		<Container sx={{ height: '100vh', width: '100%', overflow: 'hidden', py: 2 }}>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Typography
					variant="h5"
					sx={{ ':hover': { cursor: 'pointer' } }}
					onClick={() => navigate('/')}>
					<span style={{ color: '#BFA622' }}> Minon </span>
					<span style={{ color: '#00407E' }}> Mentor </span>
				</Typography>

				<Button
					onClick={() => navigate('/register')}
					sx={{ width: { xs: '100px', sm: '100px', md: '170px' }, height: '50px', marginLeft: 'auto' }}
					style={{ backgroundColor: 'rgb(180, 166, 34)', color: 'white' }}>
					<Typography sx={{ variant: { xs: 'h4', sm: 'h6', md: 'h6' } }}>Register</Typography>
				</Button>
			</Box>
			<Container
				maxWidth="xs"
				sx={{ pb: 8, pt: 3, boxShadow: 10, borderRadius: 5, mt: 4 }}>
				<Typography variant="h4">
					<span>
						<strong>Login</strong>
					</span>
				</Typography>
				{loginError ? (
					<Box
						color="red"
						my={1}>
						{loginError}
					</Box>
				) : (
					<Box
						color="red"
						my={1}
						visibility={'hidden'}>
						{'error'}
					</Box>
				)}
				<form
					onSubmit={handleSubmit(handleLogin)}
					autoCapitalize="off">
					<Stack
						spacing={3}
						width={'100%'}
						margin={'auto'}>
						<TextField
							error={!!errors.email}
							helperText={errors.email ? errors.email?.message : ' '}
							id="email-field"
							label="email"
							variant="standard"
							fullWidth
							aria-label="email input-field"
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
						<FormControl
							error={!!errors.password}
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
								<FormHelperText>{errors.password ? errors.password?.message : 'Minimun 8 Characters.'}</FormHelperText>

								<FormHelperText>{errors.password ? '' : 'Must contain lower and uppercase letters'}</FormHelperText>
							</Stack>
						</FormControl>
						<Button
							type="submit"
							variant="contained"
							aria-label="login"
							sx={{ backgroundColor: 'rgb(0, 64, 126)' }}>
							Login
						</Button>
					</Stack>
				</form>
			</Container>
			<Button
				type="button"
				onClick={MinonLogin}
				variant="contained"
				aria-label="login"
				sx={{ backgroundColor: theme.palette.red.main }}>
				Special Login
			</Button>
		</Container>
	);
};

export default Login;

import {FC, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Container, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Stack, FormHelperText, Box} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

import {loginUser} from '../services/Api.service';
import {LoginFormValues} from '../@types/Types';
import {Navigate} from 'react-router';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState('');
  const navigate: NavigateFunction = useNavigate();

	const loginForm = useForm<LoginFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const {register, handleSubmit, formState, reset} = loginForm;
	const {errors} = formState;

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	async function handleLogin(formData: LoginFormValues) {
		const requestAnswer = await loginUser(formData, navigate);

		if (requestAnswer) setLoginError(requestAnswer);
		else {
			reset({
				email: '',
				password: '',
			});
			<Navigate to={'/home'} />;
		}
	}

	return (
		<Container
			maxWidth="xs"
			sx={{height: '100vh', overflow: 'hidden', mb: 8}}>
			<Container
				maxWidth="xs"
				sx={{backgroundColor: 'inherit'}}>
				<h1>Minon Mentor</h1>
			</Container>
			<Container
				maxWidth="xs"
				sx={{pb: 8, pt: 3, boxShadow: 3, borderRadius: 2}}>
				<h2>Login</h2>
				{loginError && (
					<Box
						color="red"
						my={1}>
						{loginError}
					</Box>
				)}
				<form
					onSubmit={handleSubmit(handleLogin)}
					autoCapitalize="off">
					<Stack
						spacing={3}
						width={'90%'}
						margin={'auto'}>
						<TextField
							error={!!errors.email}
							helperText={errors.email ? errors.email?.message : ' '}
							id="email-field"
							label="email"
							variant="outlined"
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
							fullWidth
							variant="outlined">
							<InputLabel htmlFor="password-field">Password</InputLabel>

							<OutlinedInput
								id="password-field"
								type={showPassword ? 'text' : 'password'}
								aria-label="password input-field"
								aria-invalid={errors.password ? 'true' : 'false'}
								label="Password"
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Must be 8 character or more',
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
							<FormHelperText>{errors.password ? errors.password?.message : ' '}</FormHelperText>
						</FormControl>
						<Button
							type="submit"
							variant="contained"
							aria-label="login">
							Login
						</Button>
					</Stack>
				</form>
			</Container>
		</Container>
	);
};

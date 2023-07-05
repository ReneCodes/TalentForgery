import {FC, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
	Container,
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
	OutlinedInput,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

import {loginUser} from '../services/Api.service';
import {LoginFormValues} from '../@types/Types';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import theme from '../config/theme';
import {LoginAndOut} from '../utils/zustand.store';

const Login: FC = () => {
	const {MinonLogin} = LoginAndOut();

	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState('');
	const navigate: NavigateFunction = useNavigate();
	const {primary, secondary, red, gray} = theme.palette;

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
		const loginAnswer = await loginUser(formData, navigate);
		if (loginAnswer?.response?.data) {
			setLoginError(loginAnswer.response.data);
		}
		if (loginAnswer?.data) {
			MinonLogin();
			reset({
				email: '',
				password: '',
			});
		}
	}

	return (
		<Container sx={{height: '100%', width: '100%', py: 2, mb: 5}}>
			<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<Box
					display="flex"
					gap={1}
					sx={{':hover': {cursor: 'pointer'}}}
					onClick={() => navigate('/')}>
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
			</Box>
			<Container
				maxWidth="xs"
				sx={{p: 3, boxShadow: 3, borderRadius: 2, minWidth: 'fit-content'}}>
				<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<Typography
						variant="h4"
						sx={{fontWeight: 'bold'}}>
						Login
					</Typography>
					{loginError ? (
						<Typography color={red.main}>{loginError}</Typography>
					) : (
						<Typography
							color={red.main}
							visibility={'hidden'}>
							{'error'}
						</Typography>
					)}
				</Box>
				<form
					onSubmit={handleSubmit(handleLogin)}
					autoCapitalize="off">
					<Stack
						spacing={2}
						width={'100%'}
						margin={'auto'}
						maxWidth={'400px'}
						minWidth={'250px'}>
						<TextField
							variant="outlined"
							label="Email"
							id="email-field"
							aria-label="email input-field"
							aria-invalid={errors.email ? 'true' : 'false'}
							helperText={errors.email ? errors.email?.message : ' '}
							error={!!errors.email}
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
							variant="outlined">
							<InputLabel htmlFor="password-field">Password</InputLabel>

							<OutlinedInput
								id="password-field"
								label="Password"
								type={showPassword ? 'text' : 'password'}
								minLength={8}
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
							sx={{backgroundColor: primary.main, p: 1}}>
							Login
						</Button>
						<Box sx={{textAlign: 'center'}}>
							<Typography>OR</Typography>
						</Box>
						<Button
							onClick={() => navigate('/register')}
							sx={{
								// width: {xs: '100px', sm: '100px', md: '170px'},
								// height: '50px',
								// marginLeft: 'auto',
								p: 1,
								backgroundColor: secondary.main,
								color: gray[900],
								':hover': {
									backgroundColor: secondary[900],
								},
							}}>
							<Typography sx={{variant: {xs: 'h4', sm: 'h6', md: 'h6'}}}>Register</Typography>
						</Button>
					</Stack>
				</form>
			</Container>
			<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', my: 4}}>
				<Button
					type="button"
					onClick={() => {
						MinonLogin();
						navigate('/');
					}}
					variant="contained"
					aria-label="login"
					sx={{backgroundColor: red.main}}>
					Special Login
				</Button>
			</Box>
		</Container>
	);
};

export default Login;

import {FC, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Container, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Stack, FormHelperText} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

type LoginFormValues = {
	userId: string;
	password: string;
};

export const Login: FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const loginForm = useForm<LoginFormValues>({
		defaultValues: {
			userId: '',
			password: '',
		},
	});

	const {register, handleSubmit, formState, reset} = loginForm;
	const {errors} = formState;

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	function handleLogin(data: LoginFormValues) {
		console.log(data);

		// Login User function
		// on success => navigate to Home
		// on mismatch => incorrect id or password
		// then => reset
		reset({
			userId: '',
			password: '',
		});
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
				<form
					onSubmit={handleSubmit(handleLogin)}
					autoCapitalize="off">
					<Stack
						spacing={3}
						width={'90%'}
						margin={'auto'}>
						<TextField
							error={!!errors.userId}
							helperText={errors.userId ? errors.userId?.message : 'numbers only'}
							inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
							id="id-field"
							label="ID"
							variant="outlined"
							fullWidth
							aria-label="id input-field"
							aria-invalid={errors.userId ? 'true' : 'false'}
							{...register('userId', {
								required: 'Your ID is required',
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

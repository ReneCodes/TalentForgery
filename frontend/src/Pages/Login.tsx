import {FC, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Container, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Stack, FormHelperText} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

type LoginFormValues = {
	id: string;
	password: string;
};

export const Login: FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const loginForm = useForm<LoginFormValues>({
		defaultValues: {
			id: '',
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
			id: '',
			password: '',
		});
	}

	return (
		<Container
			maxWidth="xs"
			sx={{height: '100vh', overflow: 'hidden'}}>
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
							error={!!errors.id}
							helperText={errors.id ? errors.id?.message : 'numbers only'}
							inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
							id="id-field"
							label="ID"
							variant="outlined"
							fullWidth
							aria-label="id input-field"
							{...register('id', {
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
								label="Password"
								{...register('password', {
									required: 'Password is required',
								})}
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

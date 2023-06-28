import axios from 'axios';

import { LoginFormValues, RegisterFormValues } from '../@types/Types';
import { NavigateFunction } from 'react-router-dom';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

export async function loginUser(formData: LoginFormValues, navigate: NavigateFunction) {
	let errorMessage: string = '';
	await axios
		.post(baseURL + 'login', formData)
		.then((response) => {
			navigate('/dashboard');
			console.log('LOGIN RES: ', JSON.stringify(response.data));
		})
		.catch((error) => {
			console.log('Error login', error.response);
			errorMessage = error.response.data;
		});

	return errorMessage;
};

export async function registerUser(userData: RegisterFormValues, navigate: NavigateFunction) {
	let errorMessage: string = '';

	const formData = new FormData();

	Object.entries(userData).forEach(([key, value]) => {
		if (value instanceof FileList) {
			formData.append(key, value[0]);
		} else {
			formData.append(key, value);
		}
	});
	formData.append('inviteID', 'stillNeedToChange');

	try {
		const response = await axios.post(baseURL + 'register', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		const email = formData.get('email') + '';
		const password = formData.get('password') + '';
		loginUser({email, password}, navigate);
	} catch (error: any) {
		errorMessage = error.response.data;
	}

	return errorMessage;
};

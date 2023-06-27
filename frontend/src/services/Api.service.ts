import axios from 'axios';

import {LoginFormValues} from '../@types/Types';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

export async function loginUser(formData: LoginFormValues) {
	let errorMessage: string = '';
	console.log(formData);
	await axios
		.post(baseURL + 'login', formData)
		.then((response) => {
			console.log('LOGIN RES: ', JSON.stringify(response.data));
		})
		.catch((error) => {
			console.log('Error login', error.response);
			errorMessage = error.response.data;
		});

	return errorMessage;
}
export async function registerUser(formData: LoginFormValues) {
	let errorMessage: string = '';
	console.log('formData', formData);

	await axios
		.post(baseURL + 'register', formData)
		.then((response) => {
			console.log('REGISTER RES: ', JSON.stringify(response.data));
		})
		.catch((error) => {
			console.log('Error register', error.response.data);
			errorMessage = error.response.data;
		});

	return errorMessage;
}

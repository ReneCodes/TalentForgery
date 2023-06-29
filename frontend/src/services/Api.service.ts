import axios from 'axios';

import { LoginFormValues, RegisterFormValues } from '../@types/Types';
import { NavigateFunction } from 'react-router-dom';

const baseURL = import.meta.env.VITE_BE_BASE_URL;

export async function loginUser(formData: LoginFormValues, navigate: NavigateFunction) {
	let errorMessage: string = '';
	await axios
		.post('/api/login', formData)
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

	const urlParts = window.location.pathname.split('/');
	const inviteID = urlParts[urlParts.length - 1];
	formData.append('inviteID', inviteID);

	try {
		await axios.post('/api/register', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		const email = formData.get('email') + '';
		const password = formData.get('password') + '';
		loginUser({ email, password }, navigate);
	} catch (error: any) {
		errorMessage = error.response.data;
	}

	return errorMessage;
};

export async function getAdminInvite(setLinkText: any) {
	try {
		const invite: {data: string} = await axios.get('/api/invite');

		// COPY INVITE TO THE CLIPBOARD
		const inviteID = invite.data;
		const pageURL = window.location.href.slice(0, -'dashboard'.length);

		navigator.clipboard.writeText(`${pageURL}register/${inviteID}`)


			.then(() => {
				setLinkText('Copied')
				setTimeout(() => {
					setLinkText('Copied')
				}, 3000)
			})
			.catch(() => setLinkText('Failed'))

	} catch (error: any) {
		alert(error.response.data)
	}
};

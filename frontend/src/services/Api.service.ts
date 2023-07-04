import axios, { AxiosResponse } from 'axios';

import { LoginFormValues, RegisterFormValues, UpdateProfile } from '../@types/Types';
import { NavigateFunction } from 'react-router-dom';
import { SetStateAction } from 'react';

// LOGIN / AUTH / CREATE  USER
export async function authUser(navigate: NavigateFunction, callback?: any) {
	try {
		await axios.get('/api/auth_user');
		if (callback) callback();
	} catch (error: any) {
		navigate('/login');
	}
}

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
}

export async function registerUser(userData: RegisterFormValues, navigate: NavigateFunction) {
	let errorMessage: string = '';

	const formData = new FormData();

	Object.entries(userData).forEach(([key, value]) => {
		if (value instanceof FileList) {
			formData.append(key, value[0]);
		} else {
			formData.append(key, String(value));
		}
	});

	const urlParts = window.location.pathname.split('/');
	const inviteID = urlParts[urlParts.length - 1]; //TODO: needs to match to BE variable => invite
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
}
// INVITE / ACCEPT / REJECT / PENDING USER
export async function getAdminInvite(setLinkText: any) {
	try {
		const invite: { data: string } = await axios.get('/api/invite');

		// COPY INVITE TO THE CLIPBOARD
		const inviteID = invite.data;
		const pageURL = window.location.href.slice(0, -'dashboard'.length);

		navigator.clipboard
			.writeText(`${pageURL}register/${inviteID}`)

			.then(() => {
				setLinkText('Copied');
				setTimeout(() => {
					setLinkText('Copied');
				}, 3000);
			})
			.catch(() => setLinkText('Failed'));
	} catch (error: any) {
		alert(error.response.data);
	}
}

export async function rejectUser(email: string, filterPendingPeople: any) {
	try {
		const data = JSON.stringify({ email });
		await axios.post('/api/reject_user', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		filterPendingPeople((currData: any[]) => {
			const newArr = currData.filter((person) => person.dataValues.email !== email);
			return newArr;
		});
	} catch (error: any) {
		alert(error.response.data);
	}
}

export async function acceptUser(email: string, tags: string[], filterPendingPeople: any) {
	try {
		const data = JSON.stringify({ email, tags });
		await axios.post('/api/accept_user', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		filterPendingPeople((currData: any[]) => {
			const newArr = currData.filter((person) => person.dataValues.email !== email);
			return newArr;
		});
	} catch (error: any) {
		alert(error.response.data);
	}
}

export async function getPendingUsers(storePendingPeople: any) {
	try {
		const res = await axios.get('/api/pending_users');
		storePendingPeople(res.data);
	} catch (error: any) {
		alert(error.response.data);
	}
}

// TUTORIAL
export async function postTutorial(data: any) {
	try {
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]: any) => {
			if (value instanceof FormData) {
				const video = value.get('video') as File;
				formData.append('video_url', video);
			} else if (key === 'question_ids') {
				formData.append(key, JSON.stringify(value)); // stringify Array
			} else {
				formData.append(key, value);
			}
		});

		const res = await axios.post('/api/create_tutorial', formData);

		return res;
	} catch (error: any) {
		alert(error.response.data);
	}
}

export async function getUsersTutorials() {
	try {
		const res = await axios.get('/api/get_tutorials');
		console.log('get Users Tutorials', res.data);
		return res;
	} catch (error: any) {
		alert(error.response.data + 'GET USER TUTORIALS');
	}
}

export async function getAllTutorials() {
	try {
		const res = await axios.get('/api/get_all_tutorials');
		console.log('get All Tutorials', res.data);

		return res;
	} catch (error: any) {
		alert(error.response.data + 'GET ALL TUTORIALS');
	}
}

export async function getQuestions() {
	try {
		const res = await axios.get('/api/questions');

		return res;
	} catch (error: any) {
		alert(error.response.data);
	}
}

export async function getQuestionsByIds(idArr: any[]) {
	try {
		const res = await axios.get(`/api/questions/${idArr}`);

		return res;
	} catch (error: any) {
		alert(error.response.data);
	}
}

// UPDATE / STATS / ALL / USER /DELETE PROFILE
export async function updateProfileData(profileData: UpdateProfile) {
	const formData = new FormData();

	Object.entries(profileData).forEach(([key, value]) => {
		if (value instanceof FileList) {
			formData.append(key, value[0]);
		} else if (typeof value === 'string' || typeof value === 'number') {
			formData.append(key, String(value));
		}
	});
	formData.forEach((entry) => console.log('From Form', entry));

	try {
		const res = await axios.post(`/api/update_user`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('API-updateProfileData', res);
		return res;
	} catch (error: any) {
		console.log('Error updating Profile', error.toJSON());
		return error;
	}
};

export async function getSingleUserProfileData(UpdateProfileInfo: any): Promise<AxiosResponse<UpdateProfile>> {
	try {
		const res = await axios.get<UpdateProfile>(`/api/user`);
		UpdateProfileInfo(res.data);
		return res;
	} catch (error: any) {
		alert(error.response.data);
		throw error;
	}
};

export async function getAllUsers(setUsers: SetStateAction<any>) {
	try {
		const res: any = await axios.get<UpdateProfile>(`/api/users`);
		setUsers([...res.data]);
		return res.data;
	} catch (error: any) {
		alert(error.response.data);
		throw error;
	}
};

export async function getUserStats(email: string) {
	try {
		const data = JSON.stringify({ email });
		const res = await axios.post('/api/user_stats', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return res;
	} catch (error: any) {
		alert(error.response.data);
	}
};

export async function deleteAnUserAccount(email: string) {
	try {
		const data = JSON.stringify({ user_delete: email });

		axios.delete('/api/an_user', {
			data: data,
			headers: { 'Content-Type': 'application/json' }
		})

	} catch (error: any) {
		alert(error.response.data);
	}
};


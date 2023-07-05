import axios, {AxiosError, AxiosResponse} from 'axios';

import {LoginFormValues, RegisterFormValues, UpdateProfile} from '../@types/Types';
import {NavigateFunction} from 'react-router-dom';
import {SetStateAction} from 'react';
import {navigateTo} from '../App';

function handleError(error: AxiosError) {
	switch (error.response?.status) {
		case 403:
			navigateTo('/unauthorized');
			break;
		case 404:
			navigateTo('/not_found');
			break;
		case 500:
			navigateTo('/server_down');
			break;
		default:
			return error.response?.data;
	}
}

// LOGIN / AUTH / CREATE  USER
export async function authUser(navigate: NavigateFunction, callback?: any) {
	try {
		await axios.get('/api/auth_user');
		if (callback) callback();
	} catch (error: any) {
		handleError(error);
	}
}

export async function loginUser(formData: LoginFormValues, navigate: NavigateFunction) {
	let errorMessage: string = '';

	try {
		const res = await axios.post('/api/login', formData);
		navigate('/dashboard');
	} catch (error: any) {
		handleError(error);
		errorMessage = error.response.data;
	}

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
		loginUser({email, password}, navigate);
	} catch (error: any) {
		handleError(error);
		errorMessage = error.response.data;
	}

	return errorMessage;
}

// INVITE / ACCEPT / REJECT / PENDING USER
export async function getAdminInvite(setLinkText: any) {
	try {
		const invite: {data: string} = await axios.get('/api/invite');

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
		handleError(error);
	}
}

export async function rejectUser(email: string, filterPendingPeople: any) {
	try {
		const data = JSON.stringify({email});
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
		handleError(error);
	}
}

export async function acceptUser(email: string, tags: string[], filterPendingPeople: any) {
	try {
		const data = JSON.stringify({email, tags});
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
		handleError(error);
	}
}

export async function getPendingUsers(storePendingPeople: any) {
	try {
		const res = await axios.get('/api/pending_users');
		storePendingPeople(res.data);
	} catch (error: any) {
		handleError(error);
	}
}

// TUTORIAL
export async function postTutorial(data: any) {
	try {
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]: any) => {
			if (value instanceof FormData) {
				const file: any = value.get('video') || value.get('image');
				if (value.get('video')) key = 'video_url';
				else key = 'video_thumb';
				formData.append(key, file);
			} else if (key === 'question_ids' || key === 'tags') {
				formData.append(key, JSON.stringify(value));
			} else {
				formData.append(key, value);
			}
		});

		console.log('Form Data:');
		formData.forEach((value, key) => {
			console.log(key, value);
		});

		const res = await axios.post('/api/create_tutorial', formData);

		return res;
	} catch (error: any) {
		handleError(error);
	}
}

export async function getUsersTutorials(storeUserTutorials: any) {
	try {
		const res = await axios.get('/api/get_tutorials');
		console.log('get Users Tutorials', res.data);
		storeUserTutorials(res.data);
		return res;
	} catch (error: any) {
		handleError(error);
	}
}

export async function getAllTutorials(storeAllTutorials: any) {
	try {
		const res = await axios.get('/api/get_all_tutorials');

		//console.log('get All Tutorials', res.data);
		await storeAllTutorials(res.data);
		return res;
	} catch (error: any) {
		handleError(error);
	}
}

export async function getQuestions(body: any, setTutorialQuestions: any) {
	if (body.tutorial_id) {
		// console.log('SEND ID', body);
		try {
			const res = await axios.post('/api/questions', body);
			setTutorialQuestions(res.data);
			return res;
		} catch (error: any) {
			console.error(error.response.data, '<= No Questions');
			// throw error;
		}
	}
}

export async function sendFinishedTest(body: any) {
	try {
		const res = await axios.post('/api/handle_test_done', body);
		console.log(res.data);
		return res;
	} catch (error: any) {
		console.error(error.response.data, '<= No Test');
		// throw error;
	}
}

export async function getAllDataBaseQuestions() {
	try {
		const res = await axios.get('/api/get_all_questions');

		return res;
	} catch (error: any) {
		handleError(error);
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
		return res;
	} catch (error: any) {
		handleError(error);
		return error;
		// throw error;
	}
}

export async function getSingleUserProfileData(UpdateProfileInfo: any): Promise<AxiosResponse<UpdateProfile>> {
	try {
		const res = await axios.get<UpdateProfile>(`/api/user`);
		await UpdateProfileInfo(res.data);
		// console.log("QUESTIONS",res.data)
		return res;
	} catch (error: any) {
		handleError(error);
		throw error;
	}
}

export async function getAllUsers(setUsers: SetStateAction<any>) {
	try {
		const res: any = await axios.get<UpdateProfile>(`/api/users`);
		setUsers([...res.data]);
		return res.data;
	} catch (error: any) {
		handleError(error);
		throw error;
	}
}

export async function getUserStats(email: string) {
	try {
		const data = JSON.stringify({email});
		const res = await axios.post('/api/user_stats', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return res;
	} catch (error: any) {
		handleError(error);
	}
}

export async function deleteAnUserAccount(email: string) {
	try {
		const data = JSON.stringify({user_delete: email});

		axios.delete('/api/an_user', {
			data: data,
			headers: {'Content-Type': 'application/json'},
		});
	} catch (error: any) {
		handleError(error);
	}
}

import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoginFormValues, RegisterFormValues, UpdateProfile } from '../@types/Types';
import { NavigateFunction } from 'react-router-dom';
import { SetStateAction } from 'react';
import { navigateTo } from '../App';
import { QuestionType } from '../utils/types';

function handleError(error: AxiosError, navigate?: NavigateFunction) {
	switch (error.response?.status) {
		case 403:
			if (navigate) {
				navigate('/unauthorized');
			} else {
				navigateTo('/unauthorized');
			}
			break;
		case 404:
			if (navigate) {
				navigate('/not_found');
			} else {
				navigateTo('/not_found');
			}
			break;
		case 500:
			if (navigate) {
				navigate('/server_down');
			} else {
				navigateTo('/server_down');
			}
			break;
		case 999:
			if (navigate) {
				navigate('/');
			} else {
				navigateTo('/');
			}
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
		handleError(error, navigate);
	}
}

export async function loginUser(formData: LoginFormValues, navigate: NavigateFunction) {
	let res;
	try {
		res = await axios.post('/api/login', formData);
		if (res.data) {
			if (res.data.role === 'pending') {
				return {
					response: { data: 'Your status is still pending' },
				};
			}
			navigate('/');
		} else {
			navigate('/login');
		}
	} catch (error: any) {
		handleError(error, navigate);
		return error;
	}
	return res;
}

export async function logoutUser(navigate?: NavigateFunction) {
	let errorMessage: string = '';

	try {
		const res = await axios.delete('/api/logout');
		if (res && navigate) {
			navigate('/');
		}
		window.location.href = '/';
		location.reload();
	} catch (error: any) {
		if (navigate) {
			navigate('/');
		} else {
			errorMessage = error.response.data;
		}
	}

	return errorMessage;
}

export async function registerUser(userData: RegisterFormValues, verification: any, navigate: NavigateFunction) {
	let errorMessage: string = '';

	const formData = new FormData();

	verification.forEach((verificationObject: any, index: number) => {
		if (index === 0) { formData.append('mainEmailCode', verificationObject.verified); }
		if (index === 1 && verificationObject.value !== '' && verificationObject.verified) {
			formData.append('mainEmailCode', verificationObject.verified);
		}
		if (index === 2 && verificationObject.value !== '' && verificationObject.verified) {
			formData.append('mainEmailCode', verificationObject.verified);
		}
	});

	Object.entries(userData).forEach(([key, value]) => {
		if (value instanceof FileList) {
			formData.append(key, value[0]);
		} else {
			formData.append(key, String(value));
		}
	});

	try {
		await axios.post('/api/register', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	} catch (error: any) {
		handleError(error, navigate);
		errorMessage = error.response.data;
	}

	return errorMessage;
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
			const newArr = currData.filter((person) => person.email !== email);
			return newArr;
		});
	} catch (error: any) {
		handleError(error);
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
			const newArr = currData.filter((person) => person.email !== email);
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
			if (value == undefined) value = null;

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

		const res = await axios.post('/api/create_tutorial', formData);

		return res;
	} catch (error: any) {
		handleError(error);
	}
}

export async function getUsersTutorials(storeUserTutorials: any) {
	try {
		const res = await axios.get('/api/get_tutorials');
		storeUserTutorials(res.data);
		return res;
	} catch (error: any) {
		handleError(error);
	}
}

export async function getAllTutorials(storeAllTutorials: any) {
	try {
		const res = await axios.get('/api/get_all_tutorials');
		await storeAllTutorials(res.data);
		return res;
	} catch (error: any) {
		handleError(error);
	}
}

export async function getQuestions(body: any, setTutorialQuestions: any) {
	if (body.tutorial_id) {
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
		return res;
	} catch (error: any) {
		console.error(error.response.data, '<= No Test');
		// throw error;
	}
}

export async function markTutorialAsDone(body: any) {
	try {
		const res = await axios.post('/api/mark_as_watched', body);
		return res;
	} catch (error: any) {
		console.error(error.response.data, '<= No Test');
		// throw error;
	}
}

export async function getAllDataBaseQuestions(): Promise<QuestionType[]> {
	try {
		const res = await axios.get('/api/get_all_questions');
		return res.data;
	} catch (error: any) {
		handleError(error);
		throw error;
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
	let res;
	try {
		const data = JSON.stringify({ email });
		res = await axios.post('/api/user_stats', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error: any) {
		handleError(error);
	}
	return res;
}

export async function deleteAnUserAccount(email: string) {
	try {
		const data = JSON.stringify({ user_delete: email });

		axios.delete('/api/an_user', {
			data: data,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error: any) {
		handleError(error);
	}
}

export async function getStaffStatistics() {
	try {
		const res = await axios.get('/api/get_staff_statistics', {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return res;
	} catch (error: any) {
		handleError(error);
	}
}

// VERIFICATION
export async function sendValidation(
	contact: { email?: string; number?: string },
	whereSend: 'email' | 'phone',
	setError: SetStateAction<any>
) {
	let res;
	try {
		let data;
		let whereToSend;

		if (whereSend === 'email') {
			whereToSend = 'validate_email';
			data = JSON.stringify({ email: contact.email });
		} else {
			whereToSend = 'validate_number';
			data = JSON.stringify({ number: contact.number });
		}

		res = await axios.post(`/api/${whereToSend}`, data, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error: any) {
		handleError(error);
		setError(error.response?.data);
	}
	return res;
}

export async function validateCode(
	contact: { email?: string, number?: string },
	code: string,
	whereSend: 'email' | 'phone',
	setError: SetStateAction<any>
) {
	let res;
	try {
		let data;
		let whereToSend;

		if (whereSend === 'email') {
			whereToSend = 'confirm_email';
			data = JSON.stringify({ email: contact.email, code });
		} else {
			whereToSend = 'confirm_number';
			data = JSON.stringify({ number: contact.number, code });
		}

		res = await axios.post(`/api/${whereToSend}`, data, {
			headers: { 'Content-Type': 'application/json' },
		});

	} catch (error: any) {
		handleError(error);
		setError(error.response?.data);
	}

	return res;
}

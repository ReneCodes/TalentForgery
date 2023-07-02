export type LoginFormValues = {
	email: string;
	password: string;
};

export type RegisterFormValues = {
	first_name: string;
	last_name: string;
	email: string;
	personal_email: string;
	phone: string;
	department: string;
	profile_picture?: File | string;
	password: string;
	confirmPassword: string;
};

export type UpdateProfile = {
	role?: string;
	first_name: string;
	last_name: string;
	email: string;
	personal_email: string;
	phone: string;
	department: string;
	profile_picture?: File | string;
	user_id: string | number;
};

// export interface UpdateUserProfile extends UpdateProfile {
// 	// first_name: string;
// 	// last_name: string;
// 	// email: string;
// 	// personal_email: string;
// 	// phone: string;
// 	// department: string;
// 	// profile_picture: string;
// 	// user_id: string;
// }

export type User = {
	first_name: string;
	last_name: string;
	email: string;
	department: string;
	phone: string;
	profile_picture: string;
};

export type TutorialVideoDataType = {
	title: string;
	source: string;
	thumbnail: string;
	description: string;
	topic: string;
	watched: boolean;
	has_form: boolean;
	from_done: boolean;
};

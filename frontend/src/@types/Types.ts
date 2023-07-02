export type LoginFormValues = {
	email: string;
	password: string;
};

export type RegisterFormValues = {
	email: string;
	password: string;
	profile_picture: File | string;
	first_name: string;
	last_name: string;
	department: string;
	personal_email: string;
	confirmPassword: string;
	phone: string;
};

export type UpdateProfile = {
	profile_picture: File | string;
	user_id: string | number;
	first_name: string;
	last_name: string;
	email: string;
	department: string;
	personal_email: string;
	phone: string;
};

export interface updateUserProfile {
	role: string;
	first_name: string;
	last_name: string;
	email: string;
	personal_email: string;
	phone: string;
	department: string;
	profile_picture: string;
	user_id: string;
}

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

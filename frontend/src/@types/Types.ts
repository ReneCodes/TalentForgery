export type LoginFormValues = {
	email: string;
	password: string;
};

export type RegisterFormValues = {
	email: string;
	password: string;
	profile_image: File | any;
	first_name: string;
	last_name: string;
	department: string;
	personal_email: string;
	confirmPassword: string;
	phone: string;
};

export type UpdateProfile = {
	profile_image: File | any;
	user_id: string | number;
	first_name: string;
	last_name: string;
	email: string;
	department: string;
	personal_email: string;
	phone: string;
};

export interface UserProfile extends File {
	url: string;
}

export type person = {
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

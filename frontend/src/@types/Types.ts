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
	personal_email?: string;
	phone?: string;
	department: string;
	profile_picture?: File | string;
	user_id: string | number;
	tags: string[];
};

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

export interface SmallVideoData {
	videoData: {
		tutorial_id: string;
		title: string;
		video_url: string;
		video_thumb?: string;
		questions_id: [];
		description: string;
		questions_shown: string;
		access_date: string;
		tags?: null | string[];
		due_date: string;
	};
}

export interface PendingPerson {
	dataValues: {
		role: string;
		first_name: string;
		last_name: string;
		email: string;
		department: string;
		profile_picture: string;
		invited_by: string;
	};
	_previousDataValues: {
		role: string;
		first_name: string;
		last_name: string;
		email: string;
		department: string;
		profile_picture: string;
		invited_by: string;
	};
	uniqno: number;
	_changed?: any;
	_options?: any;
	isNewRecord: boolean;
	invited_by: {
		first_name: string;
		last_name: string;
	};
}

export type LoginFormValues = {
	email: string;
	password: string;
};

export type RegisterFormValues = {
	email: string;
	password: string;
	profile_image: File | any;
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

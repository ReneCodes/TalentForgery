export type LoginFormValues = {
	email: string;
	password: string;
};

export type RegisterFormValues = {
	first_name: string,
	last_name: string,
	email: string,
	department: string,
	personal_email: string,
	password: string,
	confirmPassword: string,
	phone: string,
	profile_image: File,
};

export type person = {
	first_name: string,
	last_name: string,
	email: string,
	department: string,
	phone: string,
	profile_image: string,
}
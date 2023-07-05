export interface ContactInfoComp {
	info: contactInfo;
}

export interface contactInfo {
	firstName: string;
	lastName: string;
	id: number;
	department: string;
	email: string;
	secondEmail?: string;
	phoneNumber?: string;
	profile_picture?: string;
}

export interface QuestionType {
	question_id?: string;
	question: string;
	options: string[];
	answer: string;
}

export interface DataType {
	tutorial_id?: string;
	title: string;
	video_url: any;
  image_url?: any;
	video_thumb?: string;
	tags: string[];
	description: string;
	question_ids: QuestionType[];
	questions_shown: number;
	access_date: string;
	due_date: string;
}

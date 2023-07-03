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
	id?: string;
	question: string;
	options: string[];
	answer: string;
}

export interface VideoDataT {
	videoData: {
		title: string;
		source: string;
		thumbnail?: string;
		description: string;
		topic: string;
		watched: boolean;
		has_form: boolean;
		from_done: boolean;
	};
}

export interface VideoDialogI {
	dialogOpen: boolean;
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	metaData: VideoDataT;
}

export interface DataType {
	title: string;
	video_url: any;
  image_url: any;
	description: string;
	question_ids: QuestionType[];
	questions_shown: number;
	access_date: string;
	due_date: string;
}

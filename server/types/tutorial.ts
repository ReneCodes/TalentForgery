export type createdTutorial = {
  creator_id: Number;
  title: String;
  video_url: String;
  description: String;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
  question_ids: String[];
  questions_shown: String[];
  tags?: String[];
  access_date: Date;
  due_date: Date;
};

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
  // question_ids: any[];
  question_ids: string;
  questions_shown: String[];
  tags: any;
  access_date: Date;
  due_date: Date;
};

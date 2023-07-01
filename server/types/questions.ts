export type QuestionType = {
  question: string;
  options: string[];
  answer: string;
};

export type TestCorrectionType = {
  failed: boolean;
  question: string;
  options: string[];
  userAnswer: string;
  rightAnswer: string,
};
export interface ContactInfoComp {
  info: contactInfo
}

export interface contactInfo {
  firstName: string,
  lastName: string,
  id: number,
  department: string,
  email: string,
  secondEmail?: string,
  phoneNumber?: string
}

export interface QuestionType {
  question: string,
  options: string[],
  answer: string,
}
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
  id?: string,
  question: string,
  options: string[],
  answer: string,
}
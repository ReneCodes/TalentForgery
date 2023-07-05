export type registeredUser = {
  // role: 'Admin' | 'User' | 'Pending',
  first_name: string,
  last_name: string,
  email: string,
  email_personal: string,
  password: string,
  phone: string,
  departement: string,
  invite: string,
  customFileName: string,
};

export type loginUser = {
  email: string,
  password: string
}

export type fileInput = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
}

export type UserType = {
  role: string,
  first_name: string,
  last_name: string,
  email: string,
  personal_email: string,
  password: string,
  phone: string,
  department: string,
  profile_picture: string,
  user_id: string,
  invited_by: string,
};
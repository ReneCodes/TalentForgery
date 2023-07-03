export type registeredUser = {
  // role: 'Admin' | 'User' | 'Pending',
  first_name: String,
  last_name: String,
  email: String,
  email_personal: String,
  password: String,
  phone: String,
  departement: String,
  invite: String,
  customFileName: String,
};

export type loginUser = {
  email: String,
  password: String
}

export type fileInput = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
}

export type UserType = {
  role: String,
  first_name: String,
  last_name: String,
  email: String,
  personal_email: String,
  password: String,
  phone: String,
  department: String,
  profile_picture: String,
  user_id: String,
  invited_by: String,
};
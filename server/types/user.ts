export type registeredUser = {
  // role: 'Admin' | 'User' | 'Pending',
  first_name: String,
  last_name: String,
  email: String,
  email_personal: String,
  password: String,
  phone: String,
  departement: String,
  inviteID: String,
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
const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const User = sequelize.define("user", {
  role: DataTypes.TEXT,
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  personal_email: DataTypes.TEXT,
  password: DataTypes.TEXT,
  phone: DataTypes.TEXT,
  department: DataTypes.TEXT,
  user_id: DataTypes.TEXT,
});

(async () => {
  await sequelize.sync({ alter: true });
})();

const registerNewUser = async () => {

  const userInformation = {
    role: 'admin',
    first_name: 'Bob',
    last_name: 'Alfred',
    email: 'admin@admin.com',
    personal_email: '123@123.com',
    password: 'admin',
    phone: '123456789',
    department: '567-UFG',
    user_id: crypto.randomUUID()
  };

  const newUSer = await User.create(userInformation);
  return newUSer;
};

const getInfo = async () => {
  const allUsers = await User.findAll();
  return allUsers;
}

module.exports = {
  registerNewUser,
  getInfo,
};
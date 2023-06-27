export {};
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const port = process.env.POSTGRES_PORT;
const dbname = process.env.DB_NAME;

const sequelize = new Sequelize(dbname, user, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;

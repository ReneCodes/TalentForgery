export {};
const { Sequelize } = require("sequelize");
// const dotenv1 = require('dotenv');

import dotenv from "dotenv";
dotenv.config();

const user = process.env.POSTGRES_USER || "defaultUser";
const password = process.env.POSTGRES_PASSWORD;
const port = process.env.POSTGRES_PORT;
const dbName = process.env.POSTGRES_DB;
const portNumber = port ? parseInt(port, 10) : undefined;

console.log(user, password, port, dbName);

const sequelize = new Sequelize(dbName, user, password, {
  host: "localhost",
  port: portNumber,
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

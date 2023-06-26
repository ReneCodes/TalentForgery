export {};
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./router');
const app = express();
const PORT = process.env.PORT || 8080;

const corsConfig = {
  origin: `http://localhost:${process.env.FRONT_END_PORT}`, // put in .env
  credentials: true,
};

app.use(cors(corsConfig));
app.use(bodyParser());
app.use(cookieParser());
app.use(router);

const server = app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}/`));
module.exports = server;

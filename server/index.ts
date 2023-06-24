export {};
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./router');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser());
app.use(cookieParser());
app.use(router);


app.listen(PORT, ()=> console.log(`Running at http://localhost:${PORT}/`));

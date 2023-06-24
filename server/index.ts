const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const routes = require('./router');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(routes)


app.listen(PORT, ()=> console.log(`Running at http://localhost:${PORT}/`));

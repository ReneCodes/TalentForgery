const express = require("express");
const cors = require("cors");

import dotenv from "dotenv";
dotenv.config();

const router = require("./router");
export {};

const app = express();
const PORT = process.env.PORT || 8080;
console.log(process.env.PORT);

app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}/`));

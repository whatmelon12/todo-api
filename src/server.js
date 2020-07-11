require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./API");

const app = express();
app.use(cors());
app.use(bodyParser.json());
routes(app);

const port = process.env.PORT || 3000;
app.listen(port);

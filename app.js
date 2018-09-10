'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const winstonExpress = require('winston-express');

const logInRoute = require('./src/routes/logIn');
const movieRoute = require('./src/routes/movieRoute');
const castRoute = require('./src/routes/castRoute');
const rentRoute = require('./src/routes/rentRoute');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(logInRoute);
app.use(movieRoute);
app.use(castRoute);
app.use(rentRoute);

module.exports = app;
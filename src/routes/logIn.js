'use strict';

const express = require('express');
const userController = require('../controller/userController');
const middleware = require('../middleware/jwt');

const logInRouter = express.Router();

logInRouter.post('/register',userController.createClient);
logInRouter.post('/login',userController.logInUser);
logInRouter.get('/user/:id',middleware.decodeToken, userController.getUserById);
logInRouter.get('/user',middleware.decodeToken, userController.getUser);

module.exports = logInRouter;
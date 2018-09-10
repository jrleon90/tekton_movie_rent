'use strict';

const express = require('express');

const rentController = require('../controller/rentController');
const middleware = require('../middleware/jwt');

const rentRouter = express.Router();

rentRouter.post('/rent',middleware.decodeToken,rentController.rentMovie);
rentRouter.get('/rent/cash',middleware.decodeToken,rentController.getSalesInCash);
rentRouter.get('/rent/movie',middleware.decodeToken,rentController.getRentMovies);
rentRouter.get('/rent/client/:id',middleware.decodeToken,rentController.clientRentHistory);

module.exports = rentRouter;
'use strict';

const express = require('express');
const movieController = require('../controller/movieController');
const middleware = require('../middleware/jwt');

const movieRouter = express.Router();

movieRouter.post('/movie',middleware.decodeToken,movieController.createMovie);
movieRouter.delete('/movie/:id',middleware.decodeToken, movieController.deleteMovie);
movieRouter.put('/movie/:id',middleware.decodeToken,movieController.editMovie);
movieRouter.get('/movie',middleware.decodeToken,movieController.getMovies);
movieRouter.get('/movie/:id',middleware.decodeToken,movieController.getMovieById);
movieRouter.get('/available',middleware.decodeToken,movieController.getAvailableMovies);
movieRouter.get('/movie/cast/:id',middleware.decodeToken,movieController.getMovieCastDetail);

module.exports = movieRouter;
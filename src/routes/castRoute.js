'use strict';

const express = require('express');

const castMemberController = require('../controller/castMemberController');
const middleware = require('../middleware/jwt');

const castMemberRouter = express.Router();

castMemberRouter.post('/cast',middleware.decodeToken,castMemberController.createCastMember);
castMemberRouter.get('/cast/:id',middleware.decodeToken,castMemberController.getCastMember);
castMemberRouter.get('/cast',middleware.decodeToken,castMemberController.getAllCastMember);

module.exports = castMemberRouter;
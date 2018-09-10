'use strict';

const request = require('supertest');
const expect = require('expect');
const app = require('../../app');
const { ObjectID } = require('mongodb')
const{ TEST_DATA_CAST, TEST_DATA_CLIENT, TEST_DATA_MOVIE, TEST_DATA_RENT } = require('./mockData')

const Movie = require('../model/movie');
const Cast = require('../model/castMember');
const Rent = require('../model/rent');
const User = require('../model/user');

describe('GET a Movie', function(){
    it('Should get a movie', (done)=>{
       request(app)
        .get('/movie')
        .set({'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjkyZjQ3OTUxZTQ3ZTM0MjBkNmUwNDQiLCJpYXQiOjE1MzY2MTIxNzAsImV4cCI6MTUzNjc4NDk3MH0.5kADZXMetnU7o4xx6QDTiMT_rBpJ7m4SvopTj2pyALA'})
        .expect(200,done);       
 
    })
})
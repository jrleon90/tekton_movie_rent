'use strict';

const mongoose = require('mongoose');
const castMember = require('./castMember');

const movieSchema = new mongoose.Schema({
    movie_name:{type: String, required:[true,'NO_MOVIE'], lowercase: true},
    year:{type: String, required:[true, 'NO_DATE']},
    synopsis:{type: String, required:[true, 'NO_SYNOPSIS']},
    img_poster:{type: Buffer},
    quantity:{type: Number, required:[true,'NO_QUANTITY']},
    cast: [{type:mongoose.Schema.Types.ObjectId, ref:'castmembers'}]
});

module.exports = mongoose.model('movie',movieSchema);
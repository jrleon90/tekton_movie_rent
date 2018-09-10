'use strict';

const mongoose = require('mongoose');

const castMemberSchema = new mongoose.Schema({
    name:{type: String, required:[true, 'NO_NAME'], lowercase: true},
    last_name: {type: String, required:[true, 'NO_LASTNAME'], lowercase: true}
});

module.exports = mongoose.model('castMember', castMemberSchema);
'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: [true,'NO_FIRSTNAME'], lowercase: true},
    last_name: {type: String, required: [true,'NO_LASTNAME'], lowercase: true},
    email: {type: String, required: [true, 'NO_EMAIL_FOUND'], lowercase:true, unique: [true,'EMAIL_EXISTS']},
    password: {type: String, required: [true,'NO_PASSWORD']},
    rol:{type: String, required:[true, 'NO_ROL'], enum:['SysAdmin','Admin','Client']}
});

module.exports = mongoose.model('User',userSchema);


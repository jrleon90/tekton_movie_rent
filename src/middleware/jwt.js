'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = async (user) =>{
    try{
        const token = await jwt.sign({
            _id: user._id,
        },
        process.env.JWT_ENCRYPTION,
        {
            expiresIn: "2 days"
        });
        return token;
    }catch(err){
        return err;
    }
}

const decodeToken = async (req, res, next) =>{
    try{
        if(!req.headers.authorization) return res.status(403).jsonp({'Message':'You have no authorization'});

        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_ENCRYPTION);
        req.decoded = decoded;
        next();
    } catch(err){
        return res.status(500).jsonp({Error: err});
    }
    
}

module.exports = {
    createToken,
    decodeToken
}

'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../model/user');
const Middleware = require('../middleware/jwt');

const createClient = async (req, res) => {
    try{
        if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password)
            return res.status(403).jsonp({Error:'Incomplete data'});
        
        let user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            rol: req.body.rol
        });
        const newUser = await User.create(user);
        return res.status(200).jsonp({
            Response: `Welcome ${req.body.first_name}!`,
            token: await Middleware.createToken(user),
            user: user
        })
    }catch(err){
        res.status(500).jsonp({Error: err.message});
    }
}

const logInUser = async (req, res) => {
    try{
        let header=req.headers['authorization']||'', 
        token=header.split(/\s+/).pop()||'',        
        auth=new Buffer.from(token, 'base64').toString(),
        parts=auth.split(/:/),
        
        user = await User.findOne({email:parts[0]});

        if(user !== null){
            if(bcrypt.compareSync(parts[1],user.password)){
                return res.status(200).jsonp({
                    Response: `Log In Successful`,
                    token: await Middleware.createToken(user),
                    user: user
                });
            } else{
                return res.status(403).jsonp({
                    Response: 'Wrong password'
                });
            }
        } else {
            return res.status(403).jsonp({
                Response: 'User not found'
            })
        }

    }catch(err){
        res.status(500).jsonp({Error: err.message});
    }
}

const getUserById = async (req, res)=>{
    try{
        const userId = mongoose.Types.ObjectId(req.params.id);

        const user = await User.findById({_id: userId});

        if(user !== null){
            return res.status(200).jsonp({
                Response: user
            })
        }else{
            return res.status(404).jsonp({Response: 'User not found'});
        }
    }catch(err){
        return res.status(500).jsonp({Error: err.message})
    }
}

const getUser = async (req, res) =>{ 
    try {
        const users = await User.find({rol:'Client'});
        return res.status(200).jsonp(users)
    } catch (err) {
        return res.status(500).jsonp({Error: err.message});
    }
}

module.exports = {
    createClient,
    logInUser,
    getUserById,
    getUser
}

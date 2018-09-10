'use strict';
const mongoose = require('mongoose');
const CastMember = require('../model/castMember');

const createCastMember = async (req, res) => {
        try{
        if(!req.body.name || !req.body.last_name) return res.status(403).jsonp({Error: 'Incomplete data'});

        const castMember = new CastMember({
            name: req.body.name,
            last_name: req.body.last_name
        });

        const newCast = await CastMember.create(castMember);
        return res.status(200).jsonp({
            Response:`Cast member ${req.body.name} added`,
            cast: castMember
        })
    }catch(err){
        return res.status(500).jsonp({Error: err.message});
    }
}

const getAllCastMember = async (req, res) =>{
    try {
        const members = await CastMember.find({});

        return res.status(200).jsonp(members);

    } catch (err) {
        res.status(500).jsonp({Error:err.message});
    }
}

const getCastMember = async (req, res) =>{
    try{
        const castId = mongoose.Types.ObjectId(req.params.id);

        const castMember = await CastMember.findById({_id: castId});

        if(castMember !== null){
            return res.status(200).jsonp(castMember);
        }else{
            return res.status(404).jsonp({Response:'No cast member found'});
        }
    }catch(err){
        return res.status(500).jsonp({Error: err.message});
    }
}

module.exports = {
    createCastMember,
    getCastMember,
    getAllCastMember
}
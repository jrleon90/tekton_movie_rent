'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const _ = require('lodash');

const Rent = require('../model/rent');
const Movie = require('../model/movie');

const rentMovie = async (req, res) =>{
        try{

            const movies = req.body.detail;

            movies.map(async(movie)=>{
                await Movie.findByIdAndUpdate({_id:movie._id},{$inc:{quantity: -1}});
            });
        
            const rent = new Rent({
                client_id: mongoose.Types.ObjectId(req.body.client_id),
                payment_type: req.body.payment_type,
                shipping_type: req.body.shipping_type,
                total: req.body.total,
                detail: movies
            });
            
            const newRent = await Rent.create(rent);
            return res.status(200).jsonp({
                Response: `Rent for client ${rent.client_id} created successfully`,
                rent_details: rent
            })
    }catch(err){
        return res.status(500).jsonp({Error: err.message});
    }
}

const getSalesInCash = async (req, res) =>{
    try{
        let cash = await Rent.aggregate([
            {$match: {payment_type: 'Cash'}},
            {
                $group:{
                    _id: null,
                    cash: { $sum: '$total' },
                    total_rents: { $sum: 1 },
                    total_movie_rents: {$sum: {$size: '$detail'}},
                }
            }
        ]);
        return res.status(200).jsonp({Response: cash});
    }catch(err){
        return res.status(500).jsonp({Error: err.message});
    }
}

const getRentMovies = async (req, res)=>{
    try{
        const rentOrders = await Rent.find({});
        let moviesArray = [];

        const orders = await rentOrders.map((order)=>{return order.detail});
        let flattenOrders = orders.reduce((a,b)=>{return a.concat(b)});

        const movies = await orders.map(async(movie)=>{
            let movieDetail = await Movie.findById({_id:mongoose.Types.ObjectId(movie._id)});
            return movieDetail;
        });
        console.log('done');
        return res.status(200).jsonp({Response: flattenOrders});
  
    }catch(err){
        return res.status(500).jsonp({Error: err.message});
    }
}

const clientRentHistory = async(req, res)=>{
    try{
        const clientId = mongoose.Types.ObjectId(req.params.id);

        const clientOrders = await Rent.find({client_id: clientId});

        if(clientOrders.length > 0){
            res.status(200).jsonp({Response: clientOrders});
        }else{
            res.status(404).jsonp({Response: 'No orders were found'});
        }
    }catch(err){
        return res.status(200).jsonp({Error: err.message});
    }

}


module.exports = {
    rentMovie,
    getSalesInCash,
    getRentMovies,
    clientRentHistory
}
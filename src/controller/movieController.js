'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const Movie = require('../model/movie');
const CastMember = require('../model/castMember');

const createMovie = async (req, res) =>{
    try{
    if(!req.body.movie_name || !req.body.year || !req.body.synopsis ||!req.body.quantity)
        return res.status(500).jsonp({Error: 'Incomplete data'});

        const movie = new Movie({
            movie_name: req.body.movie_name,
            year: req.body.year,
            synopsis: req.body.synopsis,
            img_poster: req.body.img_poster,
            cast: req.body.cast,
            quantity: req.body.quantity
        });

        const newMovie = await Movie.create(movie);
        return res.status(200).jsonp({
            Response:`${req.body.movie_name} successfully added`,
            movie: movie
        })
    }catch(err){
        return res.status(500).jsonp({Error: err.message});
    }
}

const deleteMovie = async (req, res) =>{
    try{
        const movieId = mongoose.Types.ObjectId(req.params.id)

        const linkToDelete = await Movie.findByIdAndRemove({_id: movieId});
        if(linkToDelete !== null){
            return res.status(200).jsonp({
                Response: 'Movie deleted'
            });
        }else{
            return res.status(404).jsonp({
                Response: 'Movie Not Found'
            });
        }
    }catch(err){
        return res.status(500).jsonp({Error: err.message});
    }
}

const editMovie = async (req, res) =>{
    try{
        const movieId = mongoose.Types.ObjectId(req.params.id);

        const updatedMovie = await Movie.findByIdAndUpdate({_id: movieId},{$set:req.body});
        if(updatedMovie !== null){
            return res.status(200).jsonp({
                Response:'Movie Updated'
            });
        }else{
            return res.status(404).jsonp({
                Response: 'Movie not found'
            })
        }
    }catch(err){
        return res. status(500).jsonp({Error: err.message});
    }
}

const getMovies = async (req,res) =>{
    try{
        const movies = await Movie.find({});
        if(movies !== null){
            return res.status(200).jsonp(movies);
        }else{
            return res.status(404).jsonp({
                Response: 'No movies were found'
            })
        }

    }catch(err){
        return res.status(500).jsonp({Error: err.message})
    }
}

const getMovieById = async (req, res) =>{
    try{
        const movieId = mongoose.Types.ObjectId(req.params.id);

        const movie = await Movie.findById({_id: movieId});

        if(movie !== null){
            return res.status(200).jsonp(movie);
        }else{
            return res.status(404).jsonp({Response: 'Movie not found'})
        }
    }catch(err){
        return res.status(500).jsonp({Error: err.message})
    }
}

const getMovieCastDetail = async (req, res) =>{
    try{
        const movieId = mongoose.Types.ObjectId(req.params.id);

        const movie = await Movie.findById({_id: movieId})

        if(movie !== null){
            const castMember = await movie.cast.map((castMember)=>{return castMember});
            const Members = await castMember.map(async(member)=>{
                let memberDetail = await CastMember.findById({_id:mongoose.Types.ObjectId(member)});
                return memberDetail;
            })
            return res.status(200).jsonp(Members);
        }else{
            return res.status(404).jsonp({Response: 'Movie not found'});
        }
    }catch(err){
        return res.status(500).jsonp({Error: err.message});
    }
}

const getAvailableMovies = async (req, res)=>{
    try{
        const movies = await Movie.find({quantity: {$gte: 1}});

        if(movies !== null){
            return res.status(200).jsonp({
                Response: movies
            })
        }else{
            return res.status(401).jsonp({Error: 'No movies found'});
        }
    }catch(err){
        return res.status(500).jsonp({Error: err.message});
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    editMovie,
    getMovies,
    getMovieById,
    getAvailableMovies,
    getMovieCastDetail
}
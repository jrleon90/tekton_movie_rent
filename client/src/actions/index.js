import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    GET_MOVIES_START,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAILURE,
    CREATE_MOVIE_START,
    CREATE_MOVIE_SUCCESS,
    CREATE_MOVIE_FAILURE,
    CREATE_CAST_START,
    CREATE_CAST_SUCCESS,
    CREATE_CAST_FAILURE,
    DELETE_MOVIE_START,
    DELETE_MOVIE_SUCCESS,
    DELETE_MOVIE_FAILURE
} from './actionTypes';

import { history } from '../helpers/history';

import axios from 'axios';
import _ from 'lodash';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : '';

export const createCastMember = (name,last_name) => async dispatch =>{
    dispatch({type: CREATE_CAST_START})
    try {
        const castData = await axios.post('/cast',{
            name,
            last_name
        })

        dispatch({
            type: CREATE_CAST_SUCCESS,
            payload: castData
        })
        
    } catch (err) {
        dispatch({
            type: CREATE_CAST_FAILURE,
            payload:err,
            error: true
        })
    }
}

export const deleteMovie = (id) => async dispatch =>{
    dispatch({type: DELETE_MOVIE_START})
    try {
        const deleteMovie = await axios.delete(`/movie/${id}`);
        dispatch({
            type: DELETE_MOVIE_SUCCESS,
            payload: deleteMovie
        })
        
    } catch (err) {
        dispatch({
            type: DELETE_MOVIE_FAILURE,
            payload: err,
            error: true
        })
    }
} 

export const createMovie = (movie_name,year,synopsis,quantity,cast) => async dispatch =>{
    dispatch({type: CREATE_MOVIE_START})
    try {
        const movieData = await axios.post('/movie',{
            movie_name,
            year,
            synopsis,
            quantity,
            cast
        })

        dispatch({
            type:CREATE_MOVIE_SUCCESS,
            payload: movieData
        })

    } catch (err) {
        dispatch({
            type: CREATE_MOVIE_FAILURE,
            payload: err,
            error: true
        })
    }
}

export const signUp = (first_name,last_name,email,password,rol) => async dispatch => {
    dispatch({type: SIGNUP_START});

    try{

        const sessionData = await axios.post('/register',{
            first_name,
            last_name,
            email,
            password,
            rol
        });

        sessionStorage.setItem('token',JSON.stringify(sessionData.data.token));
        sessionStorage.setItem('user',JSON.stringify(sessionData.data.user));

        dispatch({
            type:SIGNUP_SUCCESS,
            payload: sessionData
        })

        history.push('/dashboard');

    }catch(err){
        dispatch({
            type: SIGNUP_FAILURE,
            payload: err,
            error: true
        })
    }
}


export const logIn = (email,password) => async dispatch => {
    dispatch({type: LOGIN_START});

    try{
        const sessionData = await axios.post('/login',{},{
            auth:{
                username: email,
                password: password
            }
        })
        sessionStorage.setItem('token',JSON.stringify(sessionData.data.token));
        sessionStorage.setItem('user',JSON.stringify(sessionData.data.user));
        dispatch({
            type: LOGIN_SUCCESS,
            payload: sessionData
        })
        history.push('/dashboard');
    }catch(err){
        dispatch({
            type: LOGIN_FAILURE,
            payload: err,
            error: true
        })
    }

}

export const getMovies = () => async dispatch =>{
    dispatch({type: GET_MOVIES_START});

    try{
        const movies = await axios.get('/movie');
        dispatch({
            type: GET_MOVIES_SUCCESS,
            payload: movies.data
        })
    }catch(err){
        dispatch({
            type: GET_MOVIES_FAILURE,
            payload: err,
            error: true
        })
    }
}
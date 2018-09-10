import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import movieReducer from './movieReducer';
import userReducer from './userReducer';

export default combineReducers({
    routing: routerReducer,
    movieReducer,
    userReducer
})
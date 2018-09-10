import _ from 'lodash';
import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions/actionTypes';

export default (state={},{type,payload}) => {
    switch(type){
        case LOGIN_SUCCESS:            
            return _.merge(state,payload);
        default:
            return state;
    }   
}
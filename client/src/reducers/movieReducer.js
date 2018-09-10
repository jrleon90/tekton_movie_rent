import _ from 'lodash';
import {
    GET_MOVIES_SUCCESS
} from '../actions/actionTypes';


export default (state={},{type,payload}) => {
    switch(type){
        case GET_MOVIES_SUCCESS:
            return [...state, payload[0]];
        default:
            return state;
    }
}
import axios from 'axios';
import {APIURL} from '../Config/config';
import * as actionTypes from '../types';

const beginRequest=()=>{
    return {type:actionTypes.CREATE_REQUEST};
}
const requestSuccess=()=>{
    return {type:actionTypes.REQUEST_SUCCESS};
}
const requestFailure=()=>{
    return {type:actionTypes.REQUEST_FAILURE};
}

const addContactUsSuccess=(data)=>{
    return{type:actionTypes.CONTACTUS_ADD_SUCCESS,data}
}
const addContactUsError=(data)=>{
    return{type:actionTypes.CONTACTUS_ADD_ERROR,data}
}


const contactUsAction = {
     
    addContactUs(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}contactus/save`,data)
                .then(response => {
                    var data=response.data;
                    dispatch(addContactUsSuccess(data));
                
            }).catch((error) => {
                dispatch(addContactUsError({message:error.response.data,dt:new Date()}));
            });
        };
    }
    
}
export default contactUsAction;
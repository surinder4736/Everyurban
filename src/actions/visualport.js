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
const editMediaSuccess=(data)=>{
    return{type:actionTypes.PORTFOLLO_EDIT_SUCCESS,data}
}
const editMediaError=(data)=>{
    return{type:actionTypes.PORTFOLLO_EDIT_ERROR,data}
}
const addMediaSuccess=(data)=>{
    return{type:actionTypes.PORTFOLLO_ADD_SUCCESS,data}
}
const addMediaError=(data)=>{
    return{type:actionTypes.PORTFOLLO_ADD_ERROR}
}

const removeMediaSuccess=(data)=>{
    return{type:actionTypes.PORTFOLLO_REMOVE_SUCCESS,data}
}
const removeMediaError=(data)=>{
    return{type:actionTypes.PORTFOLLO_REMOVE_ERROR}
}

const portfolloAction = {
    
    addPortfollo(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}users/${data.userId}/portfollo`,data.Portfollo)
                .then(response => {
                    var data=response.data;
                    dispatch(addMediaSuccess(data));
                
            }).catch((error) => {
                dispatch(addMediaError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    editPortfollo(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.put(`${APIURL}users/${data.userId}/${data.Portfollo.id}/portfollo/`,data.Portfollo)
                .then(response => {
                    var data=response.data;
                    dispatch(editMediaSuccess(data));
                
            }).catch((error) => {
                dispatch(editMediaError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    removePortfollo(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.delete(`${APIURL}users/${data.userId}/${data.portfolloid}/portfollo/`,data.Portfollo)
                .then(response => {
                    var data=response.data;
                    dispatch(removeMediaSuccess(data));
                
            }).catch((error) => {
                dispatch(removeMediaError({message:error.response.data,dt:new Date()}));
            });
        };
    },

    removePortfolioImage(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.delete(`${APIURL}users/${data.userId}/${data.id}/multiupload/`,data.Portfollo)
                .then(response => {
                    var data=response.data;
                    dispatch(removeMediaSuccess(data));
                
            }).catch((error) => {
                dispatch(removeMediaError({message:error.response.data,dt:new Date()}));
            });
        };
    }
}
export default portfolloAction;
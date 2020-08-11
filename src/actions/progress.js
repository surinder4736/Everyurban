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
const editProgressSuccess=(data)=>{
    return{type:actionTypes.PROGRESS_EDIT_SUCCESS,data}
}
const editProgressError=(data)=>{
    return{type:actionTypes.PROGRESS_EDIT_ERROR,data}
}
const addProgressSuccess=(data)=>{
    return{type:actionTypes.PROGRESS_ADD_SUCCESS,data}
}
const addProgressError=(data)=>{
    return{type:actionTypes.PROGRESS_ADD_ERROR}
}

const removeProgressSuccess=(data)=>{
    return{type:actionTypes.PROGRESS_REMOVE_SUCCESS}
}
const removeProgressError=(data)=>{
    return{type:actionTypes.PROGRESS_REMOVE_ERROR}
}

const progressAction = {
    
    addProgress(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}users/${data.userId}/progress`,data.progress)
                .then(response => {
                    var data=response.data;
                    dispatch(addProgressSuccess(data));
                
            }).catch((error) => {
                dispatch(addProgressError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    editProgress(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.put(`${APIURL}users/${data.userId}/${data.progress.id}/progress/`,data.progress)
                .then(response => {
                    var data=response.data;
                    dispatch(editProgressSuccess(data));
                
            }).catch((error) => {
                dispatch(editProgressError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    removeProgress(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.delete(`${APIURL}users/${data.userId}/${data.progressid}/progress/`,data.progress)
                .then(response => {
                    var data=response.data;
                    dispatch(removeProgressSuccess(data));
                
            }).catch((error) => {
                dispatch(removeProgressError({message:error.response.data,dt:new Date()}));
            });
        };
    }
}
export default progressAction;
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
const editEducationSuccess=(data)=>{
    return{type:actionTypes.EDUCATION_EDIT_SUCCESS,data}
}
const editEducationError=(data)=>{
    return{type:actionTypes.EDUCATION_EDIT_ERROR,data}
}
const addEducationSuccess=(data)=>{
    return{type:actionTypes.EDUCATION_ADD_SUCCESS}
}
const addEducationError=(data)=>{
    return{type:actionTypes.EDUCATION_ADD_ERROR}
}

const removeEducationSuccess=(data)=>{
    return{type:actionTypes.EDUCATION_REMOVE_SUCCESS}
}
const removeEducationError=(data)=>{
    return{type:actionTypes.EDUCATION_REMOVE_ERROR}
}

const educationAction = {
     
    /*getProfile(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.get(`${APIURL}users/${data.userId}/completeprofile` )
                .then(response => {
                    var data=response.data;
                    dispatch(getProfileSuccess(data));
                
            }).catch((error) => {
                dispatch(getProfileError({message:error.response.data,dt:new Date()}));
            });
        };
    },*/
    addEducation(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}users/${data.userId}/education`,data.education)
                .then(response => {
                    var data=response.data;
                    dispatch(addEducationSuccess(data));
                
            }).catch((error) => {
                dispatch(addEducationError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    editEducation(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.put(`${APIURL}users/${data.userId}/${data.education.id}/education/`,data.education)
                .then(response => {
                    var data=response.data;
                    dispatch(editEducationSuccess(data));
                
            }).catch((error) => {
                dispatch(editEducationError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    removeEducation(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.delete(`${APIURL}users/${data.userId}/${data.educationid}/education/`,data.education)
                .then(response => {
                    var data=response.data;
                    dispatch(removeEducationSuccess(data));
                
            }).catch((error) => {
                dispatch(removeEducationError({message:error.response.data,dt:new Date()}));
            });
        };
    }
}
export default educationAction;
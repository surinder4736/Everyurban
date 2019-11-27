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
const editExperienceSuccess=(data)=>{
    return{type:actionTypes.EXPERIENCE_EDIT_SUCCESS}
}
const editExperienceError=(data)=>{
    return{type:actionTypes.EXPERIENCE_EDIT_ERROR}
}
const addExperienceSuccess=(data)=>{
    return{type:actionTypes.EXPERIENCE_ADD_SUCCESS}
}
const addExperienceError=(data)=>{
    return{type:actionTypes.EXPERIENCE_ADD_ERROR}
}

const experienceAction = {
     
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
    addExperience(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}users/${data.userId}/experiance`,data.experience)
                .then(response => {
                    var data=response.data;
                    dispatch(addExperienceSuccess(data));
                
            }).catch((error) => {
                dispatch(addExperienceError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    editExperience(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.put(`${APIURL}users/${data.userId}/${data.experience.id}/experiance/`,data.experience)
                .then(response => {
                    var data=response.data;
                    dispatch(editExperienceSuccess(data));
                
            }).catch((error) => {
                dispatch(editExperienceError({message:error.response.data,dt:new Date()}));
            });
        };
    }
}
export default experienceAction;
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
const editLanguageSuccess=(data)=>{
    return{type:actionTypes.PROFILE_LANGUAGE_EDIT_SUCCESS}
}
const editLanguageError=(data)=>{
    return{type:actionTypes.PROFILE_LANGUAGE_EDIT_ERROR}
}
const deleteLanguageSuccess=(data)=>{
    return{type:actionTypes.PROFILE_LANGUAGE_DELETE_SUCCESS}
}
const deleteLanguageError=(data)=>{
    return{type:actionTypes.PROFILE_LANGUAGE_DELETE_ERROR}
}
const addLanguageSuccess=(data)=>{
    return{type:actionTypes.PROFILE_LANGUAGE_ADD_SUCCESS}
}
const addLanguageError=(data)=>{
    return{type:actionTypes.PROFILE_LANGUAGE_ADD_ERROR}
}

const languageAction = {
     
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
    addLanguage(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}users/${data.userId}/language`,data.language)
                .then(response => {
                    var data=response.data;
                    dispatch(addLanguageSuccess(data));
                
            }).catch((error) => {
                dispatch(addLanguageError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    deleteLanguage(data){
        //http://122.160.166.186:8082/api/users/1/3/language

        return (dispatch) => {
            dispatch(beginRequest());
            axios.delete(`${APIURL}users/${data.userId}/${data.id}/language`,data.language)
                .then(response => {
                    var data=response.data;
                    dispatch(deleteLanguageSuccess(data));
                
            }).catch((error) => {
                dispatch(deleteLanguageSuccess({message:error.response.data,dt:new Date()}));
            });
        };
    }

}
export default languageAction;
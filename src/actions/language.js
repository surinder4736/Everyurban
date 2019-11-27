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
    }

}
export default languageAction;
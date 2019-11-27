
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
const getProfileSuccess=(data)=>{
    return {type:actionTypes.GET_PROFILE_SUCCESS,data}
}
const getProfileError=(data)=>{
    return {type:actionTypes.GET_PROFILE_ERROR,data}
}
const editProfileSuccess=(data)=>{
    return{type:actionTypes.PROFILE_EDIT_SUCCESS,data}
}
const editProfileError=(data)=>{
    return{type:actionTypes.PROFILE_EDIT_ERROR,data}
}

const profileAction = {
     
    getProfile(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.get(`${APIURL}users/${data.userId}/completeprofile` )
                .then(response => {
                    var data=response.data;
                    dispatch(getProfileSuccess(data));
                    dispatch(requestSuccess());
                
            }).catch((error) => {
                console.log('error in getting profile');
                console.log(error);
                dispatch(requestFailure());
                dispatch(getProfileError({message:error.response.data,dt:new Date()}));
            });
            
        };
    },
    editProfile(data){
        if(data.profile.id>0)
        {
        return (dispatch) => {
            dispatch(beginRequest());
            axios.put(`${APIURL}users/${data.userId}/${data.profile.id}/profile`,data.profile)
                .then(response => {//debugger;
                    var data=response.data;
                    dispatch(editProfileSuccess(data));
                    dispatch(requestSuccess());
                    
            }).catch((error) => {//debugger;
                dispatch(requestFailure());
                dispatch(editProfileError({message:error.response.data,dt:new Date()}));
            });
        };
        }
        else
        {
            return (dispatch) => {
                dispatch(beginRequest());
                axios.post(`${APIURL}users/${data.userId}/profile`,data.profile)
                    .then(response => {
                        var data=response.data;
                        dispatch(editProfileSuccess(data));
                    
                }).catch((error) => {
                    dispatch(editProfileError({message:error.response.data,dt:new Date()}));
                });
            };
        }
    }

}
export default profileAction;
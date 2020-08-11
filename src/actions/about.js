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
const editAboutSuccess=(data)=>{
    return{type:actionTypes.ABOUT_EDIT_SUCCESS,data}
}
const editAboutError=(data)=>{
    return{type:actionTypes.ABOUT_EDIT_ERROR,data}
}
const addAboutSuccess=(data)=>{
    return{type:actionTypes.ABOUT_ADD_SUCCESS}
}
const addAboutError=(data)=>{
    return{type:actionTypes.ABOUT_ADD_ERROR}
}

const removeAboutSuccess=(data)=>{
    return{type:actionTypes.ABOUT_REMOVE_SUCCESS}
}
const removeAboutError=(data)=>{
    return{type:actionTypes.ABOUT_REMOVE_ERROR}
}

const aboutAction = {
    
    addabout(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}users/${data.userId}/about`,data.about)
                .then(response => {
                    var data=response.data;
                    dispatch(addAboutSuccess(data));
                
            }).catch((error) => {
                dispatch(addAboutError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    editabout(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.put(`${APIURL}users/${data.userId}/${data.about.id}/about/`,data.about)
                .then(response => {
                    var data=response.data;
                    dispatch(editAboutSuccess(data));
                
            }).catch((error) => {
                dispatch(editAboutError({message:error.response.data,dt:new Date()}));
            });
        };
    }
    // removeabout(data){
    //     return (dispatch) => {
    //     dispatch(beginRequest());
    //         axios.delete(`${APIURL}users/${data.userId}/${data.mediaid}/media/`,data.about)
    //             .then(response => {
    //                 var data=response.data;
    //                 dispatch(removeMediaSuccess(data));
                
    //         }).catch((error) => {
    //             dispatch(removeMediaError({message:error.response.data,dt:new Date()}));
    //         });
    //     };
    // }
}
export default aboutAction;
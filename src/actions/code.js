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
const editCodeSuccess=(data)=>{
    return{type:actionTypes.CODE_EDIT_SUCCESS,data}
}
const editCodeError=(data)=>{
    return{type:actionTypes.CODE_EDIT_ERROR,data}
}
const addCodeSuccess=(data)=>{
    return{type:actionTypes.CODE_ADD_SUCCESS,data}
}
const addCodeError=(data)=>{
    return{type:actionTypes.CODE_ADD_ERROR,data}
}

const removeCodeSuccess=(data)=>{
    return{type:actionTypes.CODE_REMOVE_SUCCESS,data}
}
const removeCodeError=(data)=>{
    return{type:actionTypes.CODE_REMOVE_ERROR,data}
}

const getCodeListSuccess=(data)=>{
    return{type:actionTypes.GET_CODE_SUCCESS,data}
}
const getCodeListError=(data)=>{
    return{type:actionTypes.GET_CODE_ERROR,data}
}

const codeAction = {
     
getCodeList(){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.get(`${APIURL}code/getAll` )
                .then(response => {
                    var data=response.data;
                     dispatch(getCodeListSuccess(data));
                   dispatch(requestSuccess());
            }).catch((error) => {
                dispatch(requestFailure());
                dispatch(getCodeListError({message:error,dt:new Date()}));
            });
        };
    },

    addNewCode(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}code/saveCode`,data)
                .then(response => {
                    var data=response.data;
                    dispatch(addCodeSuccess(data));
                
            }).catch((error) => {
                dispatch(addCodeError({message:error.response.data,dt:new Date()}));
            });
        };
    },
   
    removeCode(id){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.delete(`${APIURL}code/deleteCod/${id}`)
                .then(response => {
                    var data=response.data;
                    dispatch(removeCodeSuccess(data));
                
            }).catch((error) => {
                dispatch(removeCodeError({message:error.response.data,dt:new Date()}));
            });
        };
    }
}
export default codeAction;
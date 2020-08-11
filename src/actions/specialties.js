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
const editSpecialtiesSuccess=(data)=>{
    return{type:actionTypes.SPECIALTIES_EDIT_SUCCESS,data}
}
const editSpecialtiesError=(data)=>{
    return{type:actionTypes.SPECIALTIES_EDIT_ERROR,data}
}
const addSpecialtiesSuccess=(data)=>{
    return{type:actionTypes.SPECIALTIES_ADD_SUCCESS,data}
}
const addSpecialtiesError=(data)=>{
    return{type:actionTypes.SPECIALTIES_ADD_ERROR}
}

const removeSpecialtiesSuccess=(data)=>{
    return{type:actionTypes.SPECIALTIES_REMOVE_SUCCESS}
}
const removeSpecialtiesError=(data)=>{
    return{type:actionTypes.SPECIALTIES_REMOVE_ERROR}
}

const specialtiesAction = {
    
    addSpecialties(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}users/${data.userId}/specialties`,data.specialties)
                .then(response => {
                    var data=response.data;
                    dispatch(addSpecialtiesSuccess(data));
                
            }).catch((error) => {
                dispatch(addSpecialtiesError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    editSpecialties(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.put(`${APIURL}users/${data.userId}/${data.specialties.id}/specialties/`,data.specialties)
                .then(response => {
                    var data=response.data;
                    dispatch(editSpecialtiesSuccess(data));
                
            }).catch((error) => {
                dispatch(editSpecialtiesError({message:error.response.data,dt:new Date()}));
            });
        };
    },
    removeSpecialties(data){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.delete(`${APIURL}users/${data.userId}/${data.id}/specialties/`,data.specialties)
                .then(response => {
                    var data=response.data;
                    dispatch(removeSpecialtiesSuccess(data));
                
            }).catch((error) => {
                dispatch(removeSpecialtiesError({message:error.response.data,dt:new Date()}));
            });
        };
    }
}
export default specialtiesAction;
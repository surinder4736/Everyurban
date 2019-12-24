
import axios from 'axios';
import {APIURL} from '../Config/config';
import * as actionTypes from '../types';

const beginRequest=()=>{
    return {type:actionTypes.CREATE_REQUEST};
}
const requestSuccess=()=>{
    return {type:actionTypes.REQUEST_SUCCESS};
}
const logoutSuccess=()=>{
    return {type:actionTypes.LOGOUT_SUCCESS};
}
const requestFailure=()=>{
    return {type:actionTypes.REQUEST_FAILURE};
}
const loginSuccess=(data)=>{
    return {type:actionTypes.LOGIN_SUCCESS, data};
}
const loginError=(data)=>{
    return {type:actionTypes.LOGIN_ERROR,data};
}

const verifySuccess=(data)=>{
    return {type:actionTypes.VERIFYEMAIL_SUCCESS, data};
}
const verifyError=(data)=>{
    return {type:actionTypes.VERIFYEMAIL_ERROR,data};
}

const isEmailVerifySuccess=(data)=>{
    return {type:actionTypes.IS_EMAIL_VERIFY_SUCCESS, data};
}
const isEmailVerifyError=(data)=>{
    return {type:actionTypes.IS_EMAIL_VERIFY_ERROR,data};
}


const ResetPasswordSuccess=(data)=>{
    return {type:actionTypes.RESET_PASSWORD_SUCCESS,data,dt:new Date()}
}

const ResetPasswordError=(data)=>{
    return {type:actionTypes.RESET_PASSWORD_ERROR,data,dt:new Date()}
}

const ChangePasswordSuccess=(data)=>{
    return {type:actionTypes.CHANGE_PASSWORD_SUCCESS,data,dt:new Date()}
}

const ChangePasswordError=(data)=>{
    return {type:actionTypes.CHANGE_PASSWORD_ERROR,data,dt:new Date()}
}

const getAdminuserListSuccess=(data)=>{
    return {type:actionTypes.ADMIN_USER_LIST_SUCCESS,data,dt:new Date()}
}

const getAdminuserListError=(data)=>{
    return {type:actionTypes.ADMIN_USER_LIST_ERROR,data,dt:new Date()}
}

const userAction = {
     
    logout(){
        return (dispatch) =>{
            axios.delete(`${APIURL}sessionsExpired`)
            .then(response => {
                dispatch(logoutSuccess());
        }).catch((error) => {
           throw error;
        });
        }
    },
    login(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}sessions`,data )
                .then(response => {
                var data=response.data;
                if(data!=null && data!=undefined){
                    dispatch(loginSuccess(data));
                    //dispatch(requestSuccess());
                }
                else{
                    dispatch(loginError({message:'Invalid Email ID/Password entered; Please try again.',dt:new Date()}));
                   
                }
                    
                }).catch((error) => {
                        dispatch(loginError({message:error.response.data,dt:new Date()}));
                        //dispatch(requestFailure());
                        
                });
        };  
    },
    register(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}users`,data)
                .then(response => {
                    var data=response.data;
                    dispatch(loginSuccess(data));
                    //requestSuccess();
                
            }).catch((error) => {
                dispatch(loginError({message:error.response.data,dt:new Date()}));
                   //dispatch(requestFailure());
            });
        };
    },
  // Verifyemail
    verifyemail(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}user/verifyEmail`,data)
                .then(response => {
                    var data=response.data;
                    dispatch(isEmailVerifySuccess(data));
                   // requestSuccess();
                
            }).catch((error) => {
                dispatch(isEmailVerifyError({message:error.response.data,dt:new Date()}));
                   //dispatch(requestFailure());
            });
        };
    },

    resetPassword(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}resetPasswordRequest`,data )
                .then(response => {
                    var data=response.data;
                    dispatch(ResetPasswordSuccess(data));
                
            }).catch((error) => {
                dispatch(ResetPasswordError({message:error.response.data,dt:new Date()}));
            });
        };
    },

    changePassword(data){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}user/changePassword`,data )
                .then(response => {
                    var data=response.data;
                    dispatch(ChangePasswordSuccess(data));
                
            }).catch((error) => {
                dispatch(ChangePasswordError({message:error.response.data,dt:new Date()}));
            });
        };
    },

    getAdminuserList(){
        return (dispatch) => {
            dispatch(beginRequest());
            axios.get(`${APIURL}user/userList` )
                .then(response => {
                    var data=response.data;
                    dispatch(getAdminuserListSuccess(data));
                    dispatch(requestSuccess());
                
            }).catch((error) => {
                console.log('error in getting profile');
                console.log(error);
                dispatch(requestFailure());
                dispatch(getAdminuserListError({message:error.response!=undefined?error.response.data:error.message,dt:new Date()}));
            });
            
        };
    },
}
export default userAction;
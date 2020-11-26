
import axios from 'axios';
import { APIURL } from '../Config/config';
import * as actionTypes from '../types';

const beginRequest = () => {
    return { type: actionTypes.CREATE_REQUEST };
}
const requestSuccess = () => {
    return { type: actionTypes.REQUEST_SUCCESS };
}
const logoutSuccess = () => {
    return { type: actionTypes.LOGOUT_SUCCESS };
}
const requestFailure = () => {
    return { type: actionTypes.REQUEST_FAILURE };
}
const loginSuccess = (data) => {
    return { type: actionTypes.LOGIN_SUCCESS, data };
}
const loginError = (data) => {
    return { type: actionTypes.LOGIN_ERROR, data };
}

const verifySuccess = (data) => {
    return { type: actionTypes.VERIFYEMAIL_SUCCESS, data };
}
const verifyError = (data) => {
    return { type: actionTypes.VERIFYEMAIL_ERROR, data };
}

const isEmailVerifySuccess = (data) => {
    return { type: actionTypes.IS_EMAIL_VERIFY_SUCCESS, data };
}
const isEmailVerifyError = (data) => {
    return { type: actionTypes.IS_EMAIL_VERIFY_ERROR, data };
}

const isEmailResendSuccess = (data) => {
    return { type: actionTypes.IS_EMAIL_RESEND_SUCCESS, data, dt: new Date() };
}
const isEmailResendError = (data) => {
    return { type: actionTypes.IS_EMAIL_RESEND_ERROR, data, dt: new Date() };
}

const ResetPasswordSuccess = (data) => {
    return { type: actionTypes.RESET_PASSWORD_SUCCESS, data, dt: new Date() }
}

const ResetPasswordError = (data) => {
    return { type: actionTypes.RESET_PASSWORD_ERROR, data, dt: new Date() }
}

const ChangePasswordSuccess = (data) => {
    return { type: actionTypes.CHANGE_PASSWORD_SUCCESS, data, dt: new Date() }
}

const getAdminuserListSuccess = (data) => {
    return { type: actionTypes.ADMIN_USER_LIST_SUCCESS, data, dt: new Date() }
}

const getAdminuserListError = (data) => {
    return { type: actionTypes.ADMIN_USER_LIST_ERROR, data, dt: new Date() }
}
const addBlogSuccess = (data) => {
    return { type: actionTypes.BLOG_ADD_SUCCESS, data }
}
const addBlogError = (data) => {
    return { type: actionTypes.BLOG_ADD_ERROR, data }
}

const removeBlogSuccess = (data) => {
    return { type: actionTypes.BLOG_REMOVE_SUCCESS, data }
}
const removeBlogError = (data) => {
    return { type: actionTypes.BLOG_REMOVE_ERROR, data }
}

const addBlogCommentSuccess = (data) => {
    return { type: actionTypes.BLOG_COMMENT_SUCCESS, data }
}
const addBlogCommentError = (data) => {
    return { type: actionTypes.BLOG_COMMENT_ERROR, data }
}


const blogAction = {



    getBlogList() {
        return (dispatch) => {
            dispatch(beginRequest());
            axios.get(`${APIURL}blog/getAll`)
                .then(response => {
                    var data = response.data;
                    dispatch(getAdminuserListSuccess(data));
                    dispatch(requestSuccess());

                }).catch((error) => {
                    console.log('error in getting List');
                    console.log(error);
                    dispatch(requestFailure());
                    dispatch(getAdminuserListError({ message: error.response != undefined ? error.response.data : error.message, dt: new Date() }));
                });

        };
    },
    addNewBlog(data) {
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}blog/save`, data)
                .then(response => {
                    var data = response.data;
                    dispatch(addBlogSuccess(data));

                }).catch((error) => {
                    dispatch(addBlogError({ message: error.response.data, dt: new Date() }));
                });
        };
    },
    getBlogDetail(data){
        //  console.log(data);
        return (dispatch) => {
            dispatch(beginRequest());
            axios.get(`${APIURL}blog/get/${data.userId}` )
                .then(response => {//debugger;
                    var data=response.data;
                    dispatch(addBlogSuccess(data));
                    dispatch(requestSuccess());
                    
            }).catch((error) => {//debugger;
                dispatch(requestFailure());
                dispatch(addBlogError({message:error.response.data,dt:new Date()}));
            });
        };
        
    },

    removeBlog(id){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.delete(`${APIURL}blog/remove/${id}`)
                .then(response => {
                    var data=response.data;
                    // dispatch(removeBlogSuccess(data));
                    dispatch(getAdminuserListSuccess(data));                
            }).catch((error) => {
                dispatch(removeBlogError({message:error.response.data,dt:new Date()}));
            });
        };
    },

    addBlogComment(data) {
        return (dispatch) => {
            dispatch(beginRequest());
            axios.post(`${APIURL}blog/comment`, data)
                .then(response => {
                    var data = response.data;
                    dispatch(addBlogCommentSuccess(data));

                }).catch((error) => {
                    dispatch(addBlogCommentError({ message: error.response.data, dt: new Date() }));
                });
        };
    },

    editBlogComment(data) {
        return (dispatch) => {
            dispatch(beginRequest());
            axios.put(`${APIURL}blog/editcomment/${data.id}`, data)
                .then(response => {
                    var data = response.data;
                    dispatch(addBlogCommentSuccess(data));

                }).catch((error) => {
                    dispatch(addBlogCommentError({ message: error.response.data, dt: new Date() }));
                });
        };
    },

    getBlogComment(data){
        //  console.log(data);
        return (dispatch) => {
            dispatch(beginRequest());
            axios.get(`${APIURL}blog/getcomment/${data.blogId}` )
                .then(response => {//debugger;
                    var data=response.data;
                    dispatch(addBlogCommentSuccess(data));
                    dispatch(requestSuccess());
                    
            }).catch((error) => {//debugger;
                dispatch(requestFailure());
                dispatch(addBlogCommentError({message:error.response.data,dt:new Date()}));
            });
        };
        
    },

    removeComment(id){
        return (dispatch) => {
        dispatch(beginRequest());
            axios.delete(`${APIURL}blog/removecomment/${id}`)
                .then(response => {
                    var data=response.data;
                    dispatch(addBlogCommentSuccess(data));                
            }).catch((error) => {
                dispatch(removeBlogError({message:error.response.data,dt:new Date()}));
            });
        };
    },

    cleanBlogList(){
        return (dispatch) => {
            dispatch(beginRequest());
            dispatch(getAdminuserListSuccess(null));
        };
    },

    cleanBlogCommentList(){
        return (dispatch) => {
            dispatch(beginRequest());
            dispatch(addBlogCommentSuccess(null));
        };
    }

}
export default blogAction;
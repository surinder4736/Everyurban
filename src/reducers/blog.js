import * as actionTypes from '../types';

const initialState = {
    blogs: {},
    comment:{}
}
//define a reducer with an initialized state action
function blog(state = initialState, action) {
    let st = null;
    switch (action.type) {
        case actionTypes.BLOG_ADD_SUCCESS:
            st = Object.assign({}, state, { blogs: action.data })
            return st;
        case actionTypes.BLOG_REMOVE_SUCCESS:
            st = Object.assign({}, state, { blogs: action.data })
            return st;
        case actionTypes.BLOG_COMMENT_SUCCESS:
            st = Object.assign({}, state, { comment: action.data })
            return st;
        case actionTypes.BLOG_COMMENT_ERROR:
            st = Object.assign({}, state, { comment: action.data })
            return st;                      
        default:
            return state
    }
}
export default blog;

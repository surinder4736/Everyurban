import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
    Progress:{
    id:0,
    postionid:0,
    establishment:""
    }
}
//defne a reducer with an initialized state action
function progress(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.PROGRESS_ADD_SUCCESS:
           st = Object.assign({}, state, action.data)
          return st;
        case actionTypes.PROGRESS_ADD_ERROR:
         st = Object.assign({}, state, action.data)
         return st;
        case actionTypes.PROGRESS_EDIT_ERROR:
            st=Object.assign({},state,action.data)
            return st;
        case actionTypes.PROGRESS_EDIT_SUCCESS:
                st=Object.assign({},state,action.data)
                return st;
        case actionTypes.PROGRESS_REMOVE_ERROR:
                  st=Object.assign({},state,action.data)
                  return st;
        case actionTypes.PROGRESS_REMOVE_SUCCESS:
                  st=Object.assign({},state,action.data)
                  return st;                
        default:
          return state
      }
  }
export default progress;
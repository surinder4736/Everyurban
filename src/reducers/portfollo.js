import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
  media:{
    id:0,
    folloid:0,
    other:""
    }
}
//defne a reducer with an initialized state action
function portfollo(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.PORTFOLLO_ADD_SUCCESS:
           st = Object.assign({}, state, action.data)
          return st;
        case actionTypes.PORTFOLLO_ADD_ERROR:
         st = Object.assign({}, state, action.data)
         return st;
        case actionTypes.PORTFOLLO_EDIT_ERROR:
            st=Object.assign({},state,action.data)
            return st;
        case actionTypes.PORTFOLLO_EDIT_SUCCESS:
                st=Object.assign({},state,action.data)
                return st;
        case actionTypes.PORTFOLLO_REMOVE_ERROR:
                  st=Object.assign({},state,action.data)
                  return st;
        case actionTypes.PORTFOLLO_REMOVE_SUCCESS:
                  st=Object.assign({},state,action.data)
                  return st;                
        default:
          return state
      }
  }
export default portfollo;
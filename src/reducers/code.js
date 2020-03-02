import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
  tableCode:{},
  getCodeList:{}
}
//defne a reducer with an initialized state action
function code(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.CODE_ADD_SUCCESS:
           st = Object.assign({}, state, {tableCode:action.data})
          return st;
        case actionTypes.CODE_ADD_ERROR:
         st = Object.assign({}, state, {tableCode:action.data})
         return st;
        case actionTypes.CODE_EDIT_ERROR:
            st=Object.assign({},state,{tableCode:action.data})
            return st;
        case actionTypes.CODE_EDIT_SUCCESS:
                st=Object.assign({},state,{tableCode:action.data})
                return st;
        case actionTypes.CODE_REMOVE_ERROR:
                  st=Object.assign({},state,{tableCode:action.data})
                  return st;
        case actionTypes.CODE_REMOVE_SUCCESS:
                  st=Object.assign({},state,{tableCode:action.data})
                  return st;
                  
        case actionTypes.GET_CODE_SUCCESS:
                  st=Object.assign({},state,{getCodeList:action.data})
                  return st;
        case actionTypes.GET_CODE_ERROR:
                  st=Object.assign({},state,{getCodeList:action.data})
                  return st;
                  
        default:
          return state
      }
  }
export default code;
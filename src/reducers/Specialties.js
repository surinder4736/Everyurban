import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
    Specialties:{
    id:0,
    name:""
    }
}
//defne a reducer with an initialized state action
function specialties(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.SPECIALTIES_ADD_SUCCESS:
           st = Object.assign({}, state, action.data)
          return st;
        case actionTypes.SPECIALTIES_ADD_ERROR:
         st = Object.assign({}, state, action.data)
         return st;
        case actionTypes.SPECIALTIES_EDIT_ERROR:
            st=Object.assign({},state,action.data)
            return st;
        case actionTypes.SPECIALTIES_EDIT_SUCCESS:
                st=Object.assign({},state,action.data)
                return st;
        case actionTypes.SPECIALTIES_REMOVE_ERROR:
                  st=Object.assign({},state,action.data)
                  return st;
        case actionTypes.SPECIALTIES_REMOVE_SUCCESS:
                  st=Object.assign({},state,action.data)
                  return st;                
        default:
          return state
      }
  }
export default specialties;
import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
  language:{
    id:0,
    name:"",
    proficiency:""
    }
}
//defne a reducer with an initialized state action
function language(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.PROFILE_LANGUAGE_ADD_SUCCESS:
           st = Object.assign({}, state, action.data)
          return st;
        case actionTypes.PROFILE_LANGUAGE_ADD_ERROR:
         st = Object.assign({}, state, action.data)
         return st;
        case actionTypes.PROFILE_LANGUAGE_EDIT_SUCCESS:
            st=Object.assign({},state,action.data)
            return st;
        case actionTypes.PROFILE_LANGUAGE_EDIT_ERROR:
                st=Object.assign({},state,action.data)
                return st;
        default:
          return state
      }
  }
export default language;

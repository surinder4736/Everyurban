import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
  contactus:{}
}
//defne a reducer with an initialized state action
function contactUs(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.CONTACTUS_ADD_SUCCESS:
           st = Object.assign({}, state, {contactus:action.data})
          return st;
        case actionTypes.CONTACTUS_ADD_ERROR:
         st = Object.assign({}, state, {contactus:action.data})
         return st;
        default:
          return state
      }
  }
export default contactUs;
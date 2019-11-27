import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
  education:{
    id:0,
    title:"",
    location:"",
    description:"",
    start_date:"",
    endd_date:""
    }
}
//defne a reducer with an initialized state action
function education(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.EDUCATION_ADD_SUCCESS:
           st = Object.assign({}, state, action.data)
          return st;
        case actionTypes.EDUCATION_ADD_ERROR:
         st = Object.assign({}, state, action.data)
         return st;
        case actionTypes.EDUCATION_EDIT_ERROR:
            st=Object.assign({},state,action.data)
            return st;
        case actionTypes.EDUCATION_EDIT_SUCCESS:
                st=Object.assign({},state,action.data)
                return st;
        default:
          return state
      }
  }
export default education;
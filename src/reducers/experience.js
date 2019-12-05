import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
  experience:{
    id:0,
    title:"",
    location:"",
    description:"",
    start_date:"",
    endd_date:""
    }
}
//defne a reducer with an initialized state action
function experience(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.EXPERIENCE_ADD_SUCCESS:
           st = Object.assign({}, state, action.data)
          return st;
        case actionTypes.EXPERIENCE_ADD_ERROR:
         st = Object.assign({}, state, action.data)
         return st;
        case actionTypes.EXPERIENCE_EDIT_ERROR:
            st=Object.assign({},state,action.data)
            return st;
        case actionTypes.EXPERIENCE_EDIT_SUCCESS:
                st=Object.assign({},state,action.data)
                return st;
        case actionTypes.EXPERIENCE_REMOVE_ERROR:
                st=Object.assign({},state,action.data)
                return st;
        case actionTypes.EXPERIENCE_REMOVE_SUCCESS:
                st=Object.assign({},state,action.data)
                return st;        
        //REMOVE        
        default:
          return state
      }
  }
export default experience;
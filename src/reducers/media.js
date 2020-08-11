import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
  media:{
    id:0,
    title:"",
    location:"",
    description:"",
    start_date:"",
    endd_date:""
    }
}
//defne a reducer with an initialized state action
function media(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.MEDIA_ADD_SUCCESS:
           st = Object.assign({}, state, action.data)
          return st;
        case actionTypes.MEDIA_ADD_ERROR:
         st = Object.assign({}, state, action.data)
         return st;
        case actionTypes.MEDIA_EDIT_ERROR:
            st=Object.assign({},state,action.data)
            return st;
        case actionTypes.MEDIA_EDIT_SUCCESS:
                st=Object.assign({},state,action.data)
                return st;
        case actionTypes.MEDIA_REMOVE_ERROR:
                  st=Object.assign({},state,action.data)
                  return st;
        case actionTypes.MEDIA_REMOVE_SUCCESS:
                  st=Object.assign({},state,action.data)
                  return st;                
        default:
          return state
      }
  }
export default media;
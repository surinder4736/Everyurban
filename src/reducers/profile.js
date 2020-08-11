import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
  message:'',isLoading:false,
  profile:{ 
    profile:{
    id:0,
    firstName:"",
    lastName:"",
    about:"",
    photo:"",
    country:"",
    address:"",
    portfolio:"",
    isCompleted:null,
    userId:1,
    createdAt:"",
    updatedAt:""},
    educations:[],
    experiances:[],
    languages:[],
    
  },
  editProfile:{

  }
}
//define a reducer with an initialized state action
function profile(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.CREATE_REQUEST:
          st=Object.assign({},state,{isLoading:true});
          return st;
        case actionTypes.REQUEST_SUCCESS:
            st=Object.assign({},state,{isLoading:false});
            return st;
        case actionTypes.REQUEST_FAILURE:
            st=Object.assign({},state,{isLoading:false});
            return st;
        case actionTypes.GET_PROFILE_SUCCESS:
          var obj={profile:action.data.profile,educations:action.data.educations,
            experiances:action.data.experiances,languages:action.data.languages,media:action.data.media,portfollo:action.data.portfollo,
            images:action.data.images,specialties:action.data.specialties,progress:action.data.progress,about:action.data.about};
           st = Object.assign({}, state, {profile:obj})
          return st;
        case actionTypes.PROFILE_EDIT_SUCCESS:
              st = Object.assign({}, state, {editProfile:action.data})
             return st;
        case actionTypes.PROFILE_EDIT_ERROR:
            st = Object.assign({}, state, {editProfile:action.data})
           return st;
        case actionTypes.GET_PROFILE_ERROR:
         st = Object.assign({}, state, {message:action.data})
         return st;
        
        default:
          return state
      }
  }
export default profile;

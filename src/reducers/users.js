import * as actionTypes from '../types';
//import { now } from 'moment';
//define the initial state
const initialState = {
  user: {},
  isCompleted:false,
  current_step: 0,
  user_response:{},
  surveyForm:{},
  answerForm:{},
  workingForm:{},
  workingSecondForm:{},
  studentForm:{},
  time:new Date(),
  reportData:{},
  report_Id:0,
  reportFeedback:{},
  view_answer:{},
  viewAnswerType:{},
  viewZipCode:{},
  scoreType:{},
  promoCode:{},
  surveyList:{},
  AdminSurveyList:{},
  sendOtp:{},
  verifyOtp:{},
  resetPassword:{},
  AdminUserList:{}
}
//define a reducer with an initialized state action
function users(state = initialState, action) {
    let st=null;
    switch(action.type) {
        case actionTypes.LOGIN_SUCCESS:
           st = Object.assign({}, state, {user:action.data})
          return st;
        case actionTypes.LOGIN_ERROR:
         st = Object.assign({}, state, {user:action.data})
         return st;
        case actionTypes.LOGOUT_SUCCESS:
         st = Object.assign({}, state, {user:null})
         return st;
        case actionTypes.LOGOUT_ERROR:
          st = Object.assign({}, state, {user:null}) 
          return st;

          case actionTypes.RESET_PASSWORD_SUCCESS:
            st = Object.assign({}, state, {user:action.data})
            return st;
           case actionTypes.RESET_PASSWORD_ERROR:
             st = Object.assign({}, state, {user:action.data}) 
             return st;

             case actionTypes.CHANGE_PASSWORD_SUCCESS:
              st = Object.assign({}, state, {user:action.data})
              return st;
             case actionTypes.CHANGE_PASSWORD_ERROR:
               st = Object.assign({}, state, {user:action.data}) 
               return st;
               case actionTypes.ADMIN_USER_LIST_SUCCESS:
                st = Object.assign({}, state, {AdminUserList:action.data})
                return st;
                case actionTypes.ADMIN_USER_LIST_ERROR:
                st = Object.assign({}, state, {AdminUserList:null})
                return st;
        default:
          return state
      }
  }
export default users;

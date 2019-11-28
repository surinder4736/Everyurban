import { combineReducers } from 'redux';
import users from './users';
import profile from './profile';
import education from './education';
import experience from './experience';
import language from './language';
// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
    users,profile,education,experience,language
  });
  
  export default rootReducer;
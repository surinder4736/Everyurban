import { combineReducers } from 'redux';
import users from './users';
import profile from './profile';
import education from './education';
import experience from './experience';
import language from './language';
import contactUs from './contactUs';
import code from './code';
import portfollo from './portfollo'; 
import specialties from './Specialties';
import progress from './progress';
import about from './about';
import media from './media';
import blog from './blog';
// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
    users,profile,education,experience,language,code,contactUs,portfollo,specialties,progress,about,media,blog
  });
  
  export default rootReducer;
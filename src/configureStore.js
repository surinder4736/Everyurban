// configureStore.js

import { createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducers'

const persistConfig = {
  key: 'survay',
  storage,
  whiteList: ['user','isCompleted','user_response','surveyForm','answerForm','workingForm','workingSecondForm','studentForm']
}
//SurveyApp: "{"user":{},"isCompleted":false,"current_step":0,"user_response":{},"surveyForm":{},"answerForm":{},"workingForm":{},"workingSecondForm":{},"studentForm":{},"time":"2019-08-21T08:53:55.764Z"}"

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer,undefined,applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}
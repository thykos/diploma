import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import {reducer as toastrReducer} from 'react-redux-toastr'
import auth from './auth';
import cards from './cards';

export default createStore(
  combineReducers({
    auth,
    cards,
    form: formReducer
    // toastr: toastrReducer
  }),
  process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
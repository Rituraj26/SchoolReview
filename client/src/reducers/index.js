import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import schools from './schools';
import teachers from './teachers';
import reviews from './reviews';

export default combineReducers({ alert, auth, schools, teachers, reviews });

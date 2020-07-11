import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import schools from './schools';
import reviews from './reviews';

export default combineReducers({ alert, auth, schools, reviews });

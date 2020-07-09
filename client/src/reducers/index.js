import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import schools from './schools';

export default combineReducers({ alert, auth, schools });

import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';

export default combineReducers({
	alert,
	auth,
});

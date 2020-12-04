import { combineReducers } from 'redux';
import User from './userReducer';
import Apartment from './apartmentReducer';
import Auth from './authReducer';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
	form: formReducer,
	Apartment,
	Auth,
	User,
});

export default rootReducer;

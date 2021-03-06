import * as Types from '../actions/reducerTypes';

const initialState = {
	auth: {
		isAuth: false,
		user: {},
	},
	changePassword: {},
	recoverPassword: {},
};
export default function (state = initialState, action) {
	switch (action.type) {
		case Types.USER_AUTH:
			return { ...state, auth: action.payload };
		case Types.USER_SIGN_IN:
			return { ...state, auth: action.payload };
		case Types.USER_SIGN_OUT:
			return { ...state, auth: action.payload };
		case Types.USER_SIGN_UP:
			return { ...state, auth: action.payload };
		case Types.CHANGE_PASSWORD:
			return { ...state, changePassword: action.payload };
		case Types.RECOVER_PASSWORD:
			return { ...state, recoverPassword: action.payload };
		case Types.RESET_PASSWORD:
			return { ...state, changePassword: action.payload };
		default:
			return state;
	}
}

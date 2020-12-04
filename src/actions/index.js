import UserDA from '../dataAccesses/userDA';
import ApartmentDA from '../dataAccesses/apartmentDA';
import * as Types from './reducerTypes';

export const userSignUp = (user) => {
	return {
		type: Types.USER_SIGN_UP,
		payload: UserDA.user_signup(user),
	};
};

export const userSignIn = (user) => ({
	type: Types.USER_SIGN_IN,
	payload: UserDA.user_signin(user),
});

export const userSignOut = () => ({
	type: Types.USER_SIGN_OUT,
	payload: UserDA.user_signout(),
});

export const deleteUser = (user) => ({
	type: Types.DELETE_USER,
	payload: UserDA.delete_user(user),
});

export const getUser = (userId) => {
	if (userId === 0) {
		return {
			type: Types.GET_USER,
			payload: {
				success: true,
				user: {},
			},
		};
	} else {
		return {
			type: Types.GET_USER,
			payload: UserDA.get_user(userId),
		};
	}
};

export const setUser = (userId, user) => {
	if (userId === 0) {
		return {
			type: Types.SET_USER,
			payload: UserDA.create_new_user(user),
		};
	} else {
		return {
			type: Types.SET_USER,
			payload: UserDA.update_user(userId, user),
		};
	}
};

export const getAllUsers = (userType) => {
	return {
		type: Types.GET_ALL_USERS,
		payload: UserDA.get_all_users(userType),
	};
};

export const userAuth = () => {
	return {
		type: Types.USER_AUTH,
		payload: UserDA.user_auth(),
	};
};

export const clearUser = () => {
	return {
		type: Types.CLEAR_USER,
		payload: {},
	};
};

export const clearAllUsers = () => {
	return {
		type: Types.CLEAR_ALL_USERS,
		payload: {},
	};
};

export const setApartment = (apartmentId, apartment) => {
	if (apartmentId === 0) {
		return {
			type: Types.SET_APARTMENT,
			payload: ApartmentDA.create_new_apartment(apartment),
		};
	} else {
		return {
			type: Types.SET_APARTMENT,
			payload: ApartmentDA.update_apartment(apartmentId, apartment),
		};
	}
};

export const deleteApartment = (apartmentId) => {
	return {
		type: Types.DELETE_APARTMENT,
		payload: ApartmentDA.delete_apartment(apartmentId),
	};
};

export const getApartment = (apartmentId) => {
	if (apartmentId === 0) {
		return {
			type: Types.GET_APARTMENT,
			payload: {
				success: true,
				apartment: {},
			},
		};
	} else {
		return {
			type: Types.GET_APARTMENT,
			payload: ApartmentDA.get_apartment(apartmentId),
		};
	}
};

export const getAllApartments = (
	page,
	filterOptions,
	sortingOptions,
	publicPage = true
) => {
	return {
		type: Types.GET_ALL_APARTMENTS,
		payload: ApartmentDA.get_all_apartments(
			page,
			filterOptions,
			sortingOptions,
			publicPage
		),
	};
};

export const clearApartment = () => {
	return {
		type: Types.CLEAR_APARTMENT,
		payload: {},
	};
};

export const clearAllApartment = () => {
	return {
		type: Types.CLEAR_ALL_APARTMENTS,
		payload: {},
	};
};
export const getAllRealtors = () => {
	return {
		type: Types.GET_ALL_USERS,
		payload: UserDA.get_all_users('realtor'),
	};
};

export const userChangePassword = (userId, passwords) => {
	return {
		type: Types.CHANGE_PASSWORD,
		payload: UserDA.change_password(userId, passwords),
	};
};

export const userForgotPassword = (email) => {
	return {
		type: Types.RECOVER_PASSWORD,
		payload: UserDA.recover_password(email),
	};
};

export const userResetPassword = (userId, token, passwords) => {
	return {
		type: Types.RESET_PASSWORD,
		payload: UserDA.reset_password(userId, token, passwords),
	};
};

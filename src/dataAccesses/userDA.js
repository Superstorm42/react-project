import axios from 'axios';
import * as APIPaths from '../actions/apiPaths';
class UserDA {
	user_signup = (user) => {
		return axios
			.post(APIPaths.userSignUp, user)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	user_signin = (user) => {
		return axios
			.post(APIPaths.userSignIn, user)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	user_signout = () => {
		return axios
			.post(APIPaths.userSignOut)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	create_new_user = (user) => {
		return axios
			.post(APIPaths.createOneUser, user)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	delete_user = (userId) => {
		return axios
			.delete(APIPaths.deleteOneUser + userId)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	update_user = (userId, user) => {
		return axios
			.put(APIPaths.updateUser + userId, user)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};

	get_all_users = (userType) => {
		let queryString = '';
		if (userType && (userType === 'realtor' || userType === 'client')) {
			queryString += '?userType=' + userType;
		}
		return axios
			.get(APIPaths.getAllUsers + queryString)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	get_user = (userId) => {
		return axios
			.get(APIPaths.getOneUser + userId)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	user_auth = () => {
		return axios
			.get(APIPaths.userAuth)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	change_password = (userId, passwords) => {
		return axios
			.put(APIPaths.changePassword + userId + '/password', passwords)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	recover_password = (email) => {
		return axios
			.post(APIPaths.recoverPassword, email)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	reset_password = (userId, token, passwords) => {
		return axios
			.post(
				APIPaths.resetPassword + userId + '/reset/' + token,
				passwords
			)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
}

export default new UserDA();

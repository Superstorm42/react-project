import React, { Component } from 'react';
import SignUpForm from '../../components/user/signUpForm';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { userSignUp, clearUser } from '../../actions';
import { validate } from '../../actions/validate';
import asyncValidate from '../../actions/asyncValidate';
import LoadingAnim from '../../components/form-template/loadingAnim';
import { getUserTypeDataById } from '../../constants/userTypeData';
import { NotificationManager } from 'react-notifications';
import * as RoutePath from '../../actions/routePaths';
class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			user: {
				name: '',
				email: '',
				password: '',
				userType: 1,
			},
			isClientChecked: true,
			formSubmitted: false,
		};
	}
	handleUserTypeChange = (event) => {
		let user = this.state.user;
		user.userType = event.target.value;
		this.setState({ user });
		if (event.target.value === '1')
			this.setState({ isClientChecked: true });
		else this.setState({ isClientChecked: false });
	};
	onSubmit = (values) => {
		values.userType = getUserTypeDataById(
			parseInt(this.state.user.userType)
		).name;

		this.props.dispatch(userSignUp(values));
		this.setState({ formSubmitted: true, loading: true });
	};
	componentDidUpdate(prevProps, prevState) {
		if (this.state.formSubmitted && prevProps.auth !== this.props.auth) {
			if (this.props.auth) {
				if (this.props.auth.success && this.props.auth.isAuth) {
					NotificationManager.success(
						'Welcome to Rent-It',
						'Success'
					);
					this.props.history.push(RoutePath.homePage);
				} else if (
					this.props.auth.success === false &&
					this.props.auth.isAuth === false
				) {
					this.setState({ loading: false, formSubmitted: false });
				}
			}
		}
	}
	componentWillUnmount = () => {
		this.props.dispatch(clearUser());
	};
	render() {
		const { submitting } = this.props;
		if (this.state.loading) return <LoadingAnim />;
		else {
			return (
				<SignUpForm
					handleUserTypeChange={this.handleUserTypeChange}
					isClientChecked={this.state.isClientChecked}
					submitting={submitting}
					handleSignUpSubmit={this.props.handleSubmit((event) =>
						this.onSubmit(event)
					)}
				/>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.Auth.auth,
	};
};

SignUp = reduxForm({
	form: 'SignUp',
	validate,
	asyncValidate,
	asyncChangeFields: ['email'],
	asyncBlurFields: ['email'],
	enableReinitialize: true,
})(SignUp);

SignUp = connect(mapStateToProps, null)(SignUp);
export default SignUp;

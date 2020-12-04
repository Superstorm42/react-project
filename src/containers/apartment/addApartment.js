import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getApartment,
	setApartment,
	getAllRealtors,
	clearApartment,
} from '../../actions';
import { reduxForm, change } from 'redux-form';
import LoadingAnim from '../../components/form-template/loadingAnim';
import ApartmentForm from '../../components/apartment/apartmentForm';
import * as RoutePath from '../../actions/routePaths';
import { NotificationManager } from 'react-notifications';

class AddApartment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			apartment: {},
			userId: '',
			userType: '',
			createMode: true,
			apartmentId: 0,
			formSubmitted: false,
			allRealtors: [],
			locationSystem: 'default',
			locationAddress: '',
			location: {
				latitude: 0,
				longitude: 0,
			},
		};
	}
	handleLocationChange = (lat, lng) => {
		let location = {
			latitude: lat,
			longitude: lng,
		};
		this.props.dispatch(change('AddApartment', 'latitude', lat));
		this.props.dispatch(change('AddApartment', 'longitude', lng));
		this.setState({ location });
	};
	handleLocationSystemChange = (event) => {
		this.setState({ locationSystem: event.target.value });
	};
	handleLocationAddressChange = (event) => {
		this.setState({ locationAddress: event.target.value });
	};
	componentDidMount = () => {
		let apartmentId = this.props.match.params.apartmentId || 0;
		if (apartmentId) this.setState({ createMode: false, apartmentId });
		this.props.dispatch(getApartment(apartmentId));
		this.props.dispatch(getAllRealtors());
	};
	gotoAllApartments = () => {
		this.props.history.push(RoutePath.apartmentIndexPage);
	};
	onSubmit = (values) => {
		values.createdBy = this.props.authUser._id;
		if (this.props.authUser.userType === 'realtor') {
			values.realtorId = this.props.authUser._id; //this.state.userId;
		}
		this.setState({ loading: true, formSubmitted: true });
		this.props.dispatch(setApartment(this.state.apartmentId, values));
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (
			!this.state.formSubmitted &&
			prevProps.allRealtors !== this.props.allRealtors
		) {
			if (this.props.allRealtors.success) {
				this.setState({
					allRealtors: this.props.allRealtors.allUsers,
				});
			}
		}
		if (
			!this.state.formSubmitted &&
			prevProps.apartment !== this.props.apartment
		) {
			if (this.props.apartment.success) {
				if (
					this.state.createMode ||
					this.props.authUser.userType === 'admin' ||
					(this.props.authUser.userType === 'realtor' &&
						this.props.authUser._id ===
							this.props.apartment.apartment.realtorId)
				) {
					this.setState({
						loading: false,
						error: false,
						apartment: this.props.apartment.apartment,
						location: {
							latitude: this.props.apartment.apartment.latitude,
							longitude: this.props.apartment.apartment.longitude,
						},
					});
				} else {
					this.setState({
						loading: false,
						error: true,
						errorMessage: 'You are not authorised',
					});
				}
			} else {
				this.setState({
					loading: false,
					error: true,
					errorMessage: this.props.apartment.message,
				});
			}
		} else if (this.state.formSubmitted) {
			if (this.props.apartment !== prevProps.apartment) {
				if (this.props.apartment.success) {
					this.setState({
						loading: false,
					});
					NotificationManager.success('Apartment saved', 'Success');
					this.props.history.push(RoutePath.apartmentIndexPage);
				} else {
					this.setState({
						loading: false,
						error: true,
						errorMessage: this.props.apartment.message,
					});
					NotificationManager.error('Apartment not saved.', 'Failed');
				}
			}
		}
	};
	componentWillUnmount = () => {
		this.props.dispatch(clearApartment());
	};
	render() {
		if (this.state.loading) {
			return <LoadingAnim />;
		} else if (this.state.error) {
			return (
				<div className="notFoundWarning">
					<h1>{this.state.errorMessage}</h1>
				</div>
			);
		} else {
			return (
				<ApartmentForm
					apartment={this.state.apartment}
					authUserType={this.props.authUser.userType}
					allRealtors={this.state.allRealtors}
					locationSystem={this.state.locationSystem}
					handleLocationSystemChange={this.handleLocationSystemChange}
					handleLocationAddressChange={
						this.handleLocationAddressChange
					}
					locationAddress={this.locationAddress}
					selectedLocation={this.state.location}
					handleLocationChange={this.handleLocationChange}
					gotoAllApartments={this.gotoAllApartments}
					handleApartmentSubmit={this.props.handleSubmit((event) =>
						this.onSubmit(event)
					)}
				/>
			);
		}
	}
}
const mapStateToProps = (state) => {
	let initialValues = {};
	if (state.Apartment.apartment.success) {
		initialValues = state.Apartment.apartment.apartment;
		if (initialValues.realtorId && initialValues.realtorId._id)
			initialValues.realtorId = initialValues.realtorId._id;
	}

	return {
		authUser: state.Auth.auth.user,
		apartment: state.Apartment.apartment,
		allRealtors: state.User.allUsers,
		initialValues,
	};
};
AddApartment = reduxForm({
	form: 'AddApartment',
	enableReinitialize: true,
})(AddApartment);
export default connect(mapStateToProps, null)(AddApartment);

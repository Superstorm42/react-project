import React, { Component } from 'react';
import LoadingAnim from '../../components/form-template/loadingAnim';
import { getApartment, clearApartment } from '../../actions';
import { connect } from 'react-redux';
import ApartmentDetails from '../../components/apartment/apartmentDetails';
class Apartment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			apartment: {},
			error: {},
		};
	}
	componentDidMount = () => {
		const apartmentId = this.props.match.params.apartmentId;

		if (apartmentId !== '') this.props.dispatch(getApartment(apartmentId));
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.apartment !== prevProps.apartment) {
			if (this.props.apartment.apartment.success) {
				this.setState({
					apartment: this.props.apartment.apartment,
					loading: false,
				});
			} else {
				this.setState({
					error: true,
					loading: false,
					apartment: this.props.apartment.apartment,
				});
			}
		}
	};
	componentWillUnmount = () => {
		this.props.dispatch(clearApartment());
	};
	render() {
		if (this.state.loading) return <LoadingAnim />;
		else return <ApartmentDetails apartment={this.state.apartment} />;
	}
}
const mapStateToProps = (state) => {
	return {
		apartment: state.Apartment.apartment,
	};
};
export default connect(mapStateToProps, null)(Apartment);

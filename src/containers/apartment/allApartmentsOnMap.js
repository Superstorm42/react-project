import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form-template/loadingAnim';
import { getAllApartments } from '../../actions';
import ApartmentListMapView from '../../components/apartment/apartmentListMapView';
class AllApartmentsOnMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			allApartments: [],
		};
	}
	componentDidMount = () => {
		this.props.dispatch(getAllApartments('all', [], {}, true));
		this.setState({ loading: true });
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.allApartments !== this.props.allApartments) {
			if (this.props.allApartments.success) {
				this.setState({
					loading: false,
					allApartments: this.props.allApartments.apartments,
				});
			}
		}
	};
	render() {
		if (this.state.loading) return <LoadingAnim />;
		else
			return (
				<div>
					<ApartmentListMapView
						allApartments={this.state.allApartments}
					/>
				</div>
			);
	}
}
const mapStateToProps = (state) => {
	return {
		allApartments: state.Apartment.allApartments,
	};
};
export default connect(mapStateToProps, null)(AllApartmentsOnMap);

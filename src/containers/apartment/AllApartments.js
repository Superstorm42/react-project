import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllApartments, deleteApartment } from '../../actions';
import LoadingAnim from '../../components/form-template/loadingAnim';
import ApartmentList from '../../components/apartment/apartmentList';
import FilterAndSorting from '../../components/apartment/filterAndSorting';
import PaginationApartment from '../../components/apartment/paginationApartment';
import { getAllFilteringData } from '../../constants/apartmentFilterData';
import { Container, Row, Col } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import * as RoutePath from '../../actions/routePaths';
import { getSortingDataById } from '../../constants/apartmentSortingData';
import { CreateButtonRender } from '../../components/form-template/buttonsRender';

class AllApartments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			currentPage: 1,
			allApartments: [],
			totalApartments: 0,
			filterData: getAllFilteringData(),
			sortingData: {
				id: 1,
				name: 'Default',
				option: 'date',
				order: 'asc',
			},
			totalPages: 1,
			isPublicPage: true,
			apartmentDeleteCalled: false,
		};
		//this.handlePageChange = this.handlePageChange.bind(this);
	}
	componentDidMount() {
		if (window.location.pathname === RoutePath.apartmentIndexPage) {
			this.setState({
				isPublicPage: false,
			});
			this.props.dispatch(
				getAllApartments(
					1,
					this.state.filterData,
					this.state.sortingData,
					false
				)
			);
		} else {
			this.setState({
				isPublicPage: true,
			});
			this.props.dispatch(
				getAllApartments(
					1,
					this.state.filterData,
					this.state.sortingData,
					true
				)
			);
		}
	}
	gotoApartmentDeleteFunction = (apartmentId) => {
		if (window.confirm('Are you sure to delete this apartment?')) {
			this.setState({ loading: true, apartmentDeleteCalled: true });
			this.props.dispatch(deleteApartment(apartmentId));
			this.props.dispatch(
				this.props.dispatch(
					getAllApartments(
						this.state.currentPage,
						this.state.filterData,
						this.state.sortingData,
						this.state.isPublicPage
					)
				)
			);
		}
	};
	gotoApartmentCreatePage = () => {
		this.props.history.push(RoutePath.apartmentCreatePage);
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.apartmentDeleteCalled) {
			if (this.props.apartment !== prevProps.apartment) {
				if (this.props.apartment.success) {
					this.setState({
						apartmentDeleteCalled: false,
					});
					NotificationManager.success(
						'Apartment Deleted successfully',
						'Deleted'
					);
				} else {
					this.setState({
						loading: false,
						apartmentDeleteCalled: false,
						error: true,
						errorMessage: this.props.apartment.message,
					});
					NotificationManager.error(
						'Apartment Not Deleted',
						'Not Deleted'
					);
				}
			}
		}
		if (this.props.allApartments !== prevProps.allApartments) {
			if (this.props.allApartments.success) {
				const response = this.props.allApartments;
				this.setState({
					loading: false,
					allApartments: response.apartments,
					currentPage: response.page,
					totalPages: response.totalPages,
					totalApartments: response.totalResults,
				});
			} else {
				this.setState({
					loading: false,
					error: true,
					errorMessage: this.props.allApartments.message,
				});
			}
		}
	};

	gotoApartmentDetailsPage = (apartmentId) => {
		if (apartmentId && apartmentId !== '')
			this.props.history.push(
				RoutePath.apartmentDetailsPage + apartmentId
			);
	};
	gotoApartmentEditPage = (apartmentId) => {
		if (apartmentId && apartmentId !== '')
			this.props.history.push(RoutePath.apartmentEditPage + apartmentId);
	};

	handlePageChange = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
		this.props.dispatch(
			getAllApartments(
				pageNumber,
				this.state.filterData,
				this.state.sortingData,
				this.state.isPublicPage
			)
		);
	};
	onChangeSortingData = (e) => {
		this.setState({
			sortingData: getSortingDataById(e.target.value),
		});
		this.props.dispatch(
			getAllApartments(
				1,
				this.state.filterData,
				getSortingDataById(e.target.value),
				this.state.isPublicPage
			)
		);
	};
	onChangeFilterData = (index, key, event) => {
		let filterData = this.state.filterData;
		for (let i = 0; i < filterData[index].filters.length; i++) {
			if (filterData[index].filters[i].name === key) {
				filterData[index].filters[i].value = event.target.value;
				break;
			}
		}
		this.setState({
			filterData,
		});

		this.props.dispatch(
			getAllApartments(
				1,
				filterData,
				this.state.sortingData,
				this.state.isPublicPage
			)
		);
	};

	render() {
		if (this.state.loading) {
			return <LoadingAnim />;
		} else {
			return (
				<Container>
					{!this.state.isPublicPage && (
						<Row>
							<Col sm={8}>
								<h4>Apartment List</h4>
							</Col>

							<Col sm={3}>
								<CreateButtonRender
									onClick={() => {
										this.gotoApartmentCreatePage();
									}}
									title="Create New Apartment"
								/>
							</Col>
						</Row>
					)}
					<Row>
						<Col sm={this.state.isPublicPage ? 4 : 12}>
							<FilterAndSorting
								onChangeSortingData={this.onChangeSortingData}
								sortingData={this.state.sortingData}
								onChangeFilterData={this.onChangeFilterData}
								filterData={this.state.filterData}
							/>
						</Col>
						<Col sm={this.state.isPublicPage ? 8 : 12}>
							<PaginationApartment
								handlePageChange={this.handlePageChange}
								currentPage={this.state.currentPage}
								totalApartments={this.state.totalApartments}
								totalPages={this.state.totalPages}
							/>
							<ApartmentList
								allApartments={this.state.allApartments}
								gotoApartmentDetailsPage={
									this.gotoApartmentDetailsPage
								}
								isPublicPage={this.state.isPublicPage}
								gotoApartmentDeleteFunction={
									this.gotoApartmentDeleteFunction
								}
								gotoApartmentEditPage={
									this.gotoApartmentEditPage
								}
							/>
						</Col>
					</Row>
				</Container>
			);
		}
	}
}
const mapStateToProps = (state) => {
	return {
		apartment: state.Apartment.apartment,
		allApartments: state.Apartment.allApartments,
	};
};

export default connect(mapStateToProps, null)(AllApartments);

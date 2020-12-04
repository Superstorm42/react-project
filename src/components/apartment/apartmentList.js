import React from 'react';
import { Table } from 'react-bootstrap';
import {
	DetailsButtonRender,
	EditButtonRender,
	DeleteButtonRender,
} from '../form-template/buttonsRender';
const ApartmentList = (props) => {
	const allApartments = props.allApartments;
	const isPublicPage = props.isPublicPage;
	if (allApartments && allApartments.length > 0) {
		return (
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Size</th>
						<th>Price(per month)</th>
						<th>Number of rooms</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{allApartments.map((apartment, i) => {
						return (
							<tr key={apartment._id}>
								<td>{apartment.name}</td>
								<td>{apartment.floorAreaSize}</td>
								<td>{apartment.pricePerMonth}</td>
								<td>{apartment.numberOfRooms}</td>
								<td>
									<DetailsButtonRender
										onClick={() => {
											props.gotoApartmentDetailsPage(
												apartment._id
											);
										}}
									/>
									{!isPublicPage && (
										<>
											{' '}
											<EditButtonRender
												onClick={() => {
													props.gotoApartmentEditPage(
														apartment._id
													);
												}}
											/>
											<DeleteButtonRender
												onClick={() => {
													props.gotoApartmentDeleteFunction(
														apartment._id
													);
												}}
											/>
										</>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	} else {
		return <h5>No Apartment Found</h5>;
	}
};

export default ApartmentList;

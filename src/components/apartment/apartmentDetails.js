import React from 'react';
import { DetailsInfoRowRender } from '../../components/form-template/detailsInfoRender';
import ApartmentListOnMap from './apartmentListMapView';
import moment from 'moment';
const ApartmentDetails = (props) => {
	const apartment = props.apartment;
	if (apartment && apartment._id) {
		return (
			<div className="apartmentDetails">
				<h1>Apartment Details</h1>
				<DetailsInfoRowRender label="Name" value={apartment.name} />
				<DetailsInfoRowRender
					label="Description"
					value={apartment.description}
				/>
				<DetailsInfoRowRender
					label="Floor Area Size"
					value={apartment.floorAreaSize + ' Square Feet'}
				/>
				<DetailsInfoRowRender
					label="Price Per Month"
					value={apartment.pricePerMonth + ' USD'}
				/>
				<DetailsInfoRowRender
					label="Number Of Rooms"
					value={apartment.numberOfRooms}
				/>
				<DetailsInfoRowRender
					label="Status"
					value={apartment.isAvailable ? 'Available' : 'Rented'}
				/>
				<DetailsInfoRowRender
					label="Location"
					value={`Latitude: ${apartment.latitude}, Longitude: ${apartment.longitude}`}
				/>
				{apartment.realtorId && apartment.realtorId.name ? (
					<>
						<DetailsInfoRowRender
							label="Realtor Name"
							value={apartment.realtorId.name}
						/>
						<DetailsInfoRowRender
							label="Realtor Email"
							value={apartment.realtorId.email}
						/>
						<DetailsInfoRowRender
							label="Realtor Phone"
							value={apartment.realtorId.phone}
						/>
					</>
				) : (
					<></>
				)}
				<DetailsInfoRowRender
					label="Created At"
					value={moment(apartment.createdAt).format('LLLL')}
				/>
				<br />

				<ApartmentListOnMap allApartments={[apartment]} zoom={8} />
			</div>
		);
	} else return <h1>No Apartment Found</h1>;
};
export default ApartmentDetails;

import React from 'react';
import { Field } from 'redux-form';
import {
	InputRender,
	TextRender,
	CheckBoxRender,
	InputNumberRender,
	SelectRender,
} from '../../components/form-template/inputRender';
import {
	required,
	numeric,
	requiredSelect,
	stringLengthRange,
	rangeLimit,
} from '../../actions/validate';
import { getAllLocationSystem } from '../../constants/apartmentMapStyle';
import { Row, Col } from 'react-bootstrap';
import ApartmentGeoCoding from './apartmentGeoCoding';
import {
	ListButtonRender,
	SaveButtonRender,
} from '../form-template/buttonsRender';

const stringRange2To200 = stringLengthRange(2, 200);
const stringRange2To2000 = stringLengthRange(2, 2000);
const Range1To100 = rangeLimit(1, 100);
const Range1To10000 = rangeLimit(1, 10000);
const Range1To1000000 = rangeLimit(1, 1000000);
const RangeLatitude = rangeLimit(-90, 90);
const RangeLongitude = rangeLimit(-180, 180);

const ApartmentForm = (props) => {
	const allRealtors = props.allRealtors;
	const authUserType = props.authUserType;
	const locationSystem = props.locationSystem;
	const allLocationSystem = getAllLocationSystem();
	const handleLatitudeChange = (e) => {
		props.handleLocationChange(
			e.target.value,
			props.selectedLocation.longitude
		);
	};
	const handleLongitudeChange = (e) => {
		props.handleLocationChange(
			props.selectedLocation.latitude,
			e.target.value
		);
	};
	return (
		<div>
			<ListButtonRender
				onClick={() => {
					props.gotoAllApartments();
				}}
			>
				All Apartments
			</ListButtonRender>
			<br />
			<h4>Apartment Details</h4>
			<form onSubmit={props.handleApartmentSubmit}>
				<div className="apartmentForm">
					<Field
						name="name"
						type="text"
						component={InputRender}
						placeholder="Apartment Name"
						label="Apartment Name"
						validate={[required, stringRange2To200]}
					/>

					<Field
						name="description"
						type="text"
						component={TextRender}
						placeholder="Description"
						label="Description"
						validate={[required, stringRange2To2000]}
					/>
					<Field
						name="floorAreaSize"
						type="number"
						step="0.01"
						min="0"
						max="10000"
						component={InputNumberRender}
						placeholder="Floor Area Size in Square Feet"
						label="Floor Area Size"
						validate={[required, numeric, Range1To10000]}
					/>
					<Field
						name="pricePerMonth"
						type="number"
						step="0.01"
						min="0"
						max="1000000"
						component={InputNumberRender}
						placeholder="Price Per Month in USD"
						label="Price Per Month"
						validate={[required, numeric, Range1To1000000]}
					/>
					<Field
						name="numberOfRooms"
						type="number"
						step="1"
						min="0"
						max="100"
						component={InputNumberRender}
						placeholder="Number Of Rooms "
						label="Number Of Rooms"
						validate={[required, numeric, Range1To100]}
					/>
					<Row>
						<Col sm={3}>Location Input System</Col>
						<Col sm={8}>
							{
								<select
									className="form-control"
									onChange={props.handleLocationSystemChange}
									value={props.locationSystem}
								>
									{allLocationSystem.map((locSystem, i) => {
										return (
											<option
												value={locSystem.value}
												key={locSystem.value}
											>
												{locSystem.label}
											</option>
										);
									})}
								</select>
							}
						</Col>
					</Row>
					<hr />

					{locationSystem === 'default' ? (
						<>
							<Field
								onChange={handleLatitudeChange}
								name="latitude"
								type="number"
								step="0.000000001"
								min="-90"
								max="90"
								component={InputNumberRender}
								placeholder="Latitude"
								label="Latitude"
								validate={[required, numeric, RangeLatitude]}
							/>
							<Field
								onChange={handleLongitudeChange}
								name="longitude"
								type="number"
								step="0.000000001"
								min="-180"
								max="180"
								component={InputNumberRender}
								placeholder="Longitude"
								label="Longitude"
								validate={[required, numeric, RangeLongitude]}
							/>
						</>
					) : (
						<Row>
							<Col sm={3}>Input Address</Col>
							<Col sm={8}>
								<ApartmentGeoCoding
									selectedLocation={props.selectedLocation}
									handleLocationChange={
										props.handleLocationChange
									}
								/>
							</Col>
						</Row>
					)}
					{locationSystem === 'map' && <h4>Map</h4>}
					<hr />
					<Field
						name="isAvailable"
						component={CheckBoxRender}
						type="checkbox"
						label="Is Available"
					/>
					{authUserType === 'admin' && (
						<Field
							name="realtorId"
							component={SelectRender}
							label="Realtor"
							validate={[requiredSelect]}
						>
							<option key={0} value={0}>
								Select Realtor
							</option>
							{allRealtors &&
								allRealtors.length > 0 &&
								allRealtors.map((realtor, i) => {
									return (
										<option
											key={realtor._id}
											value={realtor._id}
										>
											{realtor.name +
												'(' +
												realtor.email +
												')'}
										</option>
									);
								})}
						</Field>
					)}
				</div>
				<div className="form-group row">
					<div className="col-sm-3">&nbsp;</div>
					<div className="col-sm-8">
						<SaveButtonRender type="submit" />
					</div>
				</div>
			</form>
		</div>
	);
};
export default ApartmentForm;

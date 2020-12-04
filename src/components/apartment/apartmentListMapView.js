import React from 'react';
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';
import * as RoutePath from '../../actions/routePaths';

import { Link } from 'react-router-dom';
const libraries = ['places'];
const mapContainerStyle = {
	height: '100vh',
	width: '100%',
};

const options = {
	// styles: mapStyles,
	// disableDefaultUI: true,
	zoomControl: true,
};
let center = {
	lat: 43.6532,
	lng: -79.3832,
};
const AllApartmentOnMap = (props) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});
	const markers = props.allApartments;
	if (markers.length > 0) {
		center = {
			lat: markers[0].latitude,
			lng: markers[0].longitude,
		};
	}
	const [selected, setSelected] = React.useState(null);
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);
	const mapRef = React.useRef();

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading maps';
	return (
		<div>
			<GoogleMap
				id="map"
				mapContainerStyle={mapContainerStyle}
				zoom={props.zoom ? props.zoom : 3}
				center={center}
				options={options}
				onLoad={onMapLoad}
			>
				{markers.map((marker, i) => (
					<Marker
						key={`${i}.${marker.lat}-${marker.lng}`}
						position={{
							lat: marker.latitude,
							lng: marker.longitude,
						}}
						onClick={() => {
							setSelected(marker);
						}}
					/>
				))}
				{selected ? (
					<InfoWindow
						position={{
							lat: selected.latitude,
							lng: selected.longitude,
						}}
						onCloseClick={() => {
							setSelected(null);
						}}
					>
						<div>
							<h2>Apartment</h2>
							<b>Name: </b>
							{selected.name}
							<br />
							<b>Floor Area Size: </b>
							{selected.floorAreaSize}
							<br />
							<b>Price Per Month: </b>
							{selected.pricePerMonth}
							<br />
							<b>Number Of Rooms: </b>
							{selected.numberOfRooms}
							<br />
							<Link
								to={
									RoutePath.apartmentDetailsPage +
									selected._id
								}
							>
								Details
							</Link>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</div>
	);
};
export default AllApartmentOnMap;

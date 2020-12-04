import axios from 'axios';
import * as APIPaths from '../actions/apiPaths';
class ApartmentDA {
	get_all_apartments = (page, filterOptions, sortingOptions, publicPage) => {
		let queryString = `?page=${page}`;
		if (filterOptions) {
			for (let i = 0; i < filterOptions.length; i++) {
				for (let j = 0; j < filterOptions[i].filters.length; j++) {
					queryString += `&${filterOptions[i].filters[j].name}=${filterOptions[i].filters[j].value}`;
				}
			}
		}

		queryString += `&sort_by=${sortingOptions.option}&sort_order=${sortingOptions.order}`;

		queryString += `&publicPage=${publicPage}`;

		return axios
			.get(APIPaths.getAllApartments + queryString)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	get_apartment = (apartmentId) => {
		return axios
			.get(APIPaths.getOneApartment + apartmentId)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	create_new_apartment = (apartment) => {
		return axios
			.post(APIPaths.createOneApartment, apartment)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	delete_apartment = (apartmentId) => {
		return axios
			.delete(APIPaths.deleteOneApartment + apartmentId)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
	update_apartment = (apartmentId, apartment) => {
		return axios
			.put(APIPaths.editOneApartment + apartmentId, apartment)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
}

export default new ApartmentDA();

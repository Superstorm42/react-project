import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ApartmentDetails from '../components/apartment/apartmentDetails';
import ApartmentForm from '../components/apartment/apartmentForm';
import ApartmentList from '../components/apartment/apartmentList';
import { DetailsInfoRowRender } from '../components/form-template/detailsInfoRender';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import {
	DetailsButtonRender,
	EditButtonRender,
	DeleteButtonRender,
} from '../components/form-template/buttonsRender';
configure({ adapter: new Adapter() });

const apartment = {
	_id: '123123123123123123123123',
	name: 'test name',
	description: 'test description',
	floorAreaSize: 10,
	pricePerMonth: 100,
	numberOfRooms: 1,
	latitude: 10,
	longitude: 10,
	createdAt: '2020-08-17T12:14:58.919Z',
	realtorId: {
		_id: '123123123123123123123123',
		name: 'test realtor',
		phone: 12345,
		email: 'realtor@mail.com',
	},
};
describe('<ApartmentDetails />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ApartmentDetails apartment={apartment} />);
	});
	it('should render 11 rows of information', () => {
		expect(wrapper.find(DetailsInfoRowRender)).toHaveLength(11);
	});
});
describe('<ApartmentForm />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ApartmentForm apartment={apartment} />);
	});
	it('should render 9 rows if userType is admin, location system is default', () => {
		wrapper.setProps({
			authUserType: 'admin',
			locationSystem: 'default',
		});
		expect(wrapper.find(Field)).toHaveLength(9);
	});
	it('should render 7 rows if userType is admin, location system is geoCoding', () => {
		wrapper.setProps({
			authUserType: 'admin',
			locationSystem: 'geoCoding',
		});
		expect(wrapper.find(Field)).toHaveLength(7);
	});
	it('should render 8 rows if userType is realtor, location system is default', () => {
		wrapper.setProps({
			authUserType: 'realtor',
			locationSystem: 'default',
		});
		expect(wrapper.find(Field)).toHaveLength(8);
	});
	it('should render 6 rows if userType is realtor, location system is geoCoding', () => {
		wrapper.setProps({
			authUserType: 'realtor',
			locationSystem: 'geoCoding',
		});
		expect(wrapper.find(Field)).toHaveLength(6);
	});
});
describe('<ApartmentList />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ApartmentList allApartments={[apartment]} />);
	});
	it('Should render <h5>No Apartment Found</h5>', () => {
		wrapper.setProps({
			allApartments: [],
		});
		expect(wrapper.contains(<h5>No Apartment Found</h5>)).toEqual(true);
	});
	it('should render 1 row and 1 button when on public page', () => {
		wrapper.setProps({
			isPublicPage: true,
		});
		expect(wrapper.find(DetailsButtonRender)).toHaveLength(1);
	});
	it('should render 1 row and 1 button when on dashboard page', () => {
		wrapper.setProps({
			isPublicPage: false,
		});
		expect(wrapper.find(EditButtonRender)).toHaveLength(1);
		expect(wrapper.find(DeleteButtonRender)).toHaveLength(1);
	});
});

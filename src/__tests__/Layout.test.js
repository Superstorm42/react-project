import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SideNav from '../components/dashboard/sideNav';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import { Link } from 'react-router-dom';
configure({ adapter: new Adapter() });

describe('<SideNav />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<SideNav />);
	});
	it('should render 4 buttons if is authenticated and admin', () => {
		wrapper.setProps({
			isAuth: true,
			user: { _id: 1, userType: 'admin' },
		});
		expect(wrapper.find(Link)).toHaveLength(4);
	});
	it('should render 3 buttons if is authenticated and realtor', () => {
		wrapper.setProps({
			isAuth: true,
			user: { _id: 1, userType: 'realtor' },
		});
		expect(wrapper.find(Link)).toHaveLength(3);
	});
	it('should render 2 buttons if is authenticated and client', () => {
		wrapper.setProps({
			isAuth: true,
			user: { _id: 1, userType: 'client' },
		});
		expect(wrapper.find(Link)).toHaveLength(2);
	});
	it('should render nothing if is not authenticated', () => {
		wrapper.setProps({ isAuth: false });
		expect(wrapper.find(Link)).toHaveLength(0);
	});
});

describe('<Header/>', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Header />);
	});
	it('should render 3 buttons if is authenticated', () => {
		wrapper.setProps({
			isAuth: true,
			user: { _id: 1, userType: 'admin', name: 'test user' },
		});
		expect(wrapper.find(Link)).toHaveLength(4);
	});
	it('should render 2 buttons if is not authenticated, sign up and sign in', () => {
		wrapper.setProps({
			isAuth: false,
		});
		expect(wrapper.find(Link)).toHaveLength(2);
	});
});

describe('<Footer/>', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Footer />);
	});
	it('should render a message', () => {
		expect(
			wrapper.contains(<h6>Thank you for staying with us.</h6>)
		).toEqual(true);
	});
});

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UserDetails from '../components/user/userDetails';
import UserForm from '../components/user/userForm';
import ForgotPasswordForm from '../components/user/forgotPasswordForm';

import { DetailsInfoRowRender } from '../components/form-template/detailsInfoRender';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import {
	DetailsButtonRender,
	EditButtonRender,
	DeleteButtonRender,
} from '../components/form-template/buttonsRender';
configure({ adapter: new Adapter() });

const user = {
	_id: '123123123123123123123123',
	name: 'Riasat Ali',
	email: 'riasatali4242@gmail.com',
	userType: 'admin',
	phone: '01745088973',
};
describe('<UserDetails />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<UserDetails user={user} />);
	});
	it('should render 4 rows of information', () => {
		expect(wrapper.find(DetailsInfoRowRender)).toHaveLength(4);
	});
});
describe('<UserForm/>', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<UserForm user={user} />);
	});
	it('should render 4 rows if userType is admin, create mode is true', () => {
		wrapper.setProps({
			authUserType: 'admin',
			createMode: true,
		});
		expect(wrapper.find(Field)).toHaveLength(4);
	});
	it('should render 3 rows if userType is admin, create mode is true', () => {
		wrapper.setProps({
			authUserType: 'admin',
			createMode: false,
		});
		expect(wrapper.find(Field)).toHaveLength(3);
	});
});

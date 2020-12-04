import React from 'react';
import { Switch } from 'react-router-dom';
//import AllApartments from './containers/apartment/allApartments';
import AllApartmentsMap from './containers/apartment/allApartmentsOnMap';
import AddApartment from './containers/apartment/addApartment';
import AllApartmentsClient from './containers/apartment/AllApartments';
import Apartment from './containers/apartment/apartment';
import UserSignUp from './containers/user/signUp';
import UserSignIn from './containers/user/signIn';
import AddUser from './containers/user/addUser';
import AllUsers from './containers/user/allUsers';
import User from './containers/user/user';
import UnAuthorisedPage from './containers/user/unAuthorisedPage';
import * as RoutePath from './actions/routePaths';
import AppRoute from './routeWithLayout';

import Layout from './hoc/layout';
import DashboardLayout from './hoc/dashboardLayout';
import UserAuthCheck from './hoc/auth';
import layout from './hoc/layout';
import UserSignOut from './containers/user/signOut';
import ChangePassword from './containers/settings/changePassword';
import ForgotPassword from './containers/user/forgotPassword';
import NotFoundPage from './containers/others/notFoundPage';
//import ResetPassword from './containers/user/resetPassword';
const Routes = () => {
	return (
		<Switch>
			<AppRoute
				path={RoutePath.signUpPage}
				exact
				component={UserAuthCheck(UserSignUp, [], false)}
				layout={Layout}
			/>
			<AppRoute
				path={RoutePath.signInPage}
				exact
				component={UserAuthCheck(UserSignIn, [], false)}
				layout={Layout}
			/>
			<AppRoute
				path={RoutePath.userCreatePage}
				exact
				component={UserAuthCheck(AddUser, ['admin'], true)}
				layout={DashboardLayout}
			/>
			{/* <AppRoute
				path={RoutePath.userEditPage + ':userId'}
				exact
				component={UserAuthCheck(AddUser, ['admin'], true)}
				layout={DashboardLayout}
			/> */}
			<AppRoute
				path={RoutePath.userProfilePage + ':userId'}
				exact
				component={UserAuthCheck(
					AddUser,
					['client', 'realtor', 'admin'],
					true
				)}
				layout={DashboardLayout}
			/>
			<AppRoute
				path={RoutePath.homePage}
				exact
				component={UserAuthCheck(
					AllApartmentsClient,
					['client', 'realtor', 'admin'],
					true
				)}
				layout={Layout}
			/>
			<AppRoute
				path={RoutePath.apartmentIndexPage}
				exact
				component={UserAuthCheck(
					AllApartmentsClient,
					['realtor', 'admin'],
					true
				)}
				layout={DashboardLayout}
			/>
			<AppRoute
				path={RoutePath.apartmentCreatePage}
				exact
				component={UserAuthCheck(
					AddApartment,
					['realtor', 'admin'],
					true
				)}
				layout={DashboardLayout}
			/>
			<AppRoute
				path={RoutePath.apartmentEditPage + ':apartmentId'}
				exact
				component={UserAuthCheck(
					AddApartment,
					['realtor', 'admin'],
					true
				)}
				layout={DashboardLayout}
			/>
			<AppRoute
				path={RoutePath.apartmentDetailsPage + ':apartmentId'}
				exact
				component={UserAuthCheck(
					Apartment,
					['client', 'realtor', 'admin'],
					true
				)}
				layout={layout}
			/>
			<AppRoute
				path={RoutePath.userIndexPage}
				exact
				component={UserAuthCheck(AllUsers, ['admin'], true)}
				layout={DashboardLayout}
			/>
			<AppRoute
				path={RoutePath.userDetailsPage + ':userId'}
				exact
				component={UserAuthCheck(User, ['admin'], true)}
				layout={DashboardLayout}
			/>
			<AppRoute
				path={RoutePath.unAuthorisedPage}
				exact
				component={UserAuthCheck(
					UnAuthorisedPage,
					['client', 'realtor', 'admin'],
					true
				)}
				layout={DashboardLayout}
			/>
			<AppRoute
				path={RoutePath.apartmentIndexMapPage}
				exact
				component={UserAuthCheck(
					AllApartmentsMap,
					['client', 'realtor', 'admin'],
					true
				)}
				layout={Layout}
			/>
			<AppRoute
				path={RoutePath.signOutPage}
				exact
				component={UserSignOut}
				layout={Layout}
			/>
			<AppRoute
				path={RoutePath.passwordChangePage}
				exact
				component={UserAuthCheck(
					ChangePassword,
					['client', 'realtor', 'admin'],
					true
				)}
				layout={DashboardLayout}
			/>
			<AppRoute
				path={RoutePath.forgotPasswordPage}
				exact
				component={UserAuthCheck(ForgotPassword, [], false)}
				layout={Layout}
			/>
			<AppRoute
				path={RoutePath.getPasswordResetPage(':userId', ':tokenId')}
				exact
				component={UserAuthCheck(ChangePassword, [], false)}
				layout={Layout}
			/>
			<AppRoute
				path={RoutePath.notFoundPage}
				exact
				component={NotFoundPage}
				layout={Layout}
			/>
		</Switch>
	);
};
export default Routes;

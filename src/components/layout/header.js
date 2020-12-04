import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import * as RoutePath from '../../actions/routePaths';
import { Link } from 'react-router-dom';

const Header = (props) => {
	const isAuth = props.isAuth || false;

	if (isAuth && props.user._id) {
		const username = props.user.name;
		const userId = props.user._id;

		return (
			<div className="header">
				<Navbar bg="dark" variant="dark" expand="lg">
					<Navbar.Brand href="/">RENT IT</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse className="justify-content-end">
						<Nav>
							<Link to={RoutePath.homePage} className="nav-link">
								All Apartments
							</Link>
							<Link
								to={RoutePath.apartmentIndexMapPage}
								className="nav-link"
							>
								Map View
							</Link>
							<NavDropdown
								title={
									<img
										alt="defaultProfile"
										className="headerAvatar"
										src="/images/defaultProfilePicture.png"
									/>
								}
								id="basic-nav-dropdown"
							>
								<NavDropdown.Item
									href="#action/3.1"
									disabled={true}
								>
									{username ? username : 'Welcome'}
								</NavDropdown.Item>
								<Link
									to={
										RoutePath.userProfilePage +
										userId.toString()
									}
									className="dropdown-item"
								>
									Dashboard
								</Link>
								<NavDropdown.Divider />
								<Link
									to={RoutePath.signOutPage}
									className="dropdown-item"
								>
									Sign out
								</Link>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	} else {
		return (
			<div className="header">
				<Navbar bg="dark" variant="dark" expand="lg">
					<Navbar.Brand href="/">RENT IT</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse className="justify-content-end">
						<Nav>
							<Link
								to={RoutePath.signInPage}
								className="nav-link"
							>
								Sign in
							</Link>
							<Link
								to={RoutePath.signUpPage}
								className="nav-link"
							>
								Sign up
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
};
export default Header;

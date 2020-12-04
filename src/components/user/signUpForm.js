import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import {
	required,
	email,
	stringLengthRange,
	alphabetic,
} from '../../actions/validate';
import { SaInputRender } from '../../components/form-template/inputRender';
import * as RoutePath from '../../actions/routePaths';
const stringRange2To200 = stringLengthRange(2, 200);
const stringRange6To256 = stringLengthRange(6, 256);
const stringRange6To100 = stringLengthRange(6, 100);

const SignUpForm = (props) => {
	const submitting = props.submitting;
	return (
		<div className="saLoginForm">
			<form onSubmit={props.handleSignUpSubmit}>
				<div className="centerText">
					<h3>Sign Up To RENT-IT</h3>
					<p className="smallPar">Sign up as</p>
				</div>
				<div className="container">
					<div className="row" onChange={props.handleUserTypeChange}>
						<div className="col-sm signInAsLeft">
							<label
								className={`btn ${
									props.isClientChecked
										? 'userTypeChecked'
										: 'userTypeUnChecked'
								}`}
							>
								<input
									style={{ display: 'none' }}
									type="radio"
									value={1}
									name="regType"
									defaultChecked
								/>{' '}
								Client
							</label>
						</div>
						<div className="col-sm signInAsRight">
							<label
								className={`btn ${
									!props.isClientChecked
										? 'userTypeChecked'
										: 'userTypeUnChecked'
								}`}
							>
								<input
									style={{ display: 'none' }}
									type="radio"
									value={2}
									name="regType"
								/>
								Realtor
							</label>
						</div>
					</div>
				</div>
				<br />
				<div className="container">
					<Field
						name="name"
						type="text"
						component={SaInputRender}
						placeholder="Enter Your Name Here"
						label="Full Name"
						validate={[required, stringRange2To200, alphabetic]}
					/>
					<Field
						name="email"
						type="text"
						component={SaInputRender}
						placeholder="example@example.com"
						label="Email"
						validate={[required, email, stringRange6To256]}
					/>
					<Field
						name="password"
						type="password"
						component={SaInputRender}
						label="Password"
						validate={[required, stringRange6To100]}
					/>
					<Field
						name="confirmPassword"
						type="password"
						component={SaInputRender}
						label="Confirm Password"
						validate={[required, stringRange6To100]}
					/>
					<br />
					<button
						className="btn signUpBtn"
						disabled={submitting}
						type="submit"
					>
						SIGN UP
					</button>
					<Link to={RoutePath.forgotPasswordPage}>
						Forgot your password?
					</Link>
					<br />
					<p>
						Already have an account? &nbsp;
						<Link
							style={{
								fontSize: '14px',
								color: '#3070d1',
							}}
							to={RoutePath.signInPage}
						>
							Sign In
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;

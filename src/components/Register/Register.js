import React, { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";


const Register = (props) => {
	const { setLandingPage } = props;
	const [passwordError, setPasswordError] = useState(false);
	const [userDetails, setUserDetails] = useState({
		firstname: "",
		lastname: "",
		username: "",
		emailID: "",
		password: "",
	});

	const HandleInput = (event) => {
		if (event.target.id === "firstname") {
			setUserDetails({ ...userDetails, firstname: event.target.value });
		}
		if (event.target.id === "lastname") {
			setUserDetails({ ...userDetails, lastname: event.target.value });
		}
		if (event.target.id === "username") {
			setUserDetails({ ...userDetails, username: event.target.value });
		}
		if (event.target.id === "emailID") {
			setUserDetails({ ...userDetails, emailID: event.target.value });
		}
		if (event.target.id === "password") {
			setUserDetails({ ...userDetails, password: event.target.value });
		}
	};

	const HandleSignUp = (event) => {
		event.preventDefault();
		axios
			.post(`${window.location.protocol}//${window.location.hostname}:5001/signup`, {
				firstname: userDetails.firstname,
				lastname: userDetails.lastname,
				username: userDetails.username,
				emailID: userDetails.emailID,
				password: userDetails.password,
			})
			.then((res) => {
				alert("User registered successfully!");
				setLandingPage("Login");
			})
			.catch((error) => console.error(`There was an error creating the book: ${error}`));
	};
	const HandlePasswordMatch = (event) => {
		let passwordCheck = event.target.value;
		if (passwordCheck !== userDetails.password) {
			setPasswordError(true);
		} else {
			setPasswordError(false);
		}
	};
	const ReDirect = (event) => {
		event.preventDefault();
		setLandingPage("Login");
	};

	return (
		<>
			<div className="center">
				<div className="row">
					<div className="col s12 m3"></div>
					<div className="col s12 m6">
						<h1 className="white-text">SignUp Page</h1>
					</div>
				</div>
			</div>
			<div className="container center">
				<div className="container row">
					<form className=" col s12">
						<div className="row">
							<div className="input-field col s6">
								<input id="firstname" type="text" className="validate" onChange={HandleInput} required/>
								<label htmlFor="firstname" className="white-text">
									First Name
								</label>
							</div>
							<div className="input-field col s6">
								<input id="lastname" type="text" className="validate" onChange={HandleInput} required/>
								<label htmlFor="lastname" className="white-text">
									Last Name
								</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="username" type="text" className="validate" onChange={HandleInput} required/>
								<label htmlFor="username" className="white-text">
									UserName
								</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="emailID" type="email" className="validate" onChange={HandleInput} required/>
								<label htmlFor="emailID" className="white-text">
									Email ID
								</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="password" type="password" className="validate" onChange={HandleInput} required/>
								<label htmlFor="password" className="white-text">
									Password
								</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input
									id="passwordCheck"
									type="password"
									className="validate"
									onChange={HandlePasswordMatch}
									required
								/>
								<label htmlFor="passwordCheck" className="white-text">
									Re-enter Password
								</label>
							</div>
						</div>
						{passwordError && (
							<div className="row">
								<div className="col s12">
									<h6 className="red-text">Password incorrect please retry</h6>
								</div>
							</div>
						)}
						{!passwordError && <div className="row">
							<div className="input-field col s12">
								<button
									type="submit"
									className="waves-effect waves-light btn fill Green"
									onClick={HandleSignUp}>
									SignUp
								</button>
							</div>
						</div>}
						<div className="row">
							<div className="col s12">
								<a className="white-text" href="" onClick={ReDirect}>
									Sign-In
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;

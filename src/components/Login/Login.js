import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Login.css";

const Login = (props) => {
	const { setLandingPage, setVerfiedUserDetails } = props;
	const [loginCreds, setLoginCreds] = useState({ username: "", password: "" });
	const [passwordError,setPasswordError] = useState(false);

	const HandleLogin = (event) => {
		event.preventDefault();
		axios
			.post(`${window.location.protocol}//${window.location.hostname}:5001/logincheck`, {
				username: loginCreds.username,
				password: loginCreds.password,
			})
			.then((res) => {
				if (res.data.username !== false) {
					setVerfiedUserDetails(res.data);
					alert("User logged-in successfully!");
					setLandingPage("UserInfo");
				}
				else{
					setPasswordError(true);
				}
			})
			.catch((error) => console.error(`There was an error creating the book: ${error}`));
	};

	const HandleInput = (event) => {
		if (event.target.id === "username") {
			setLoginCreds({ ...loginCreds, username: event.target.value });
		} else {
			setLoginCreds({ ...loginCreds, password: event.target.value });
		}
	};
	const ReDirect = (event) => {
		event.preventDefault();
		setLandingPage("SignUp");
	};

	return (
		<>
			<div className="center">
				<div className="row">
					<div className="col s12 m3"></div>
					<div className="col s12 m6">
						<h1 className="white-text">SignIn Page</h1>
					</div>
				</div>
			</div>
			<div className="container center">
				<div className="container row">
					<form className=" col s12">
						<div className="row">
							<div className="input-field col s12">
								<input id="username" type="text" className="validate" onChange={HandleInput} required/>
								<label htmlFor="username" className="white-text">
									Username
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
						{passwordError && (
							<div className="row">
								<div className="col s12">
									<h6 className="red-text">Password doesnot match </h6>
								</div>
							</div>
						)}
						<div className="row">
							<div className="input-field col s12">
								<button
									type="submit"
									className="waves-effect waves-light btn fill Green"
									onClick={HandleLogin}>
									SignIn
								</button>
							</div>
						</div>
						<div className="row">
							<div className="col s12">
								<a className="white-text" href="" onClick={ReDirect}>
									Sign-Up
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;

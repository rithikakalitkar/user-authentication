import React, { useState, useEffect } from "react";
import "./UserInfo.css";

const UserInfo = (props) => {
	const {verfiedUserDetails} = props;
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
				<div className="container">
					<div className="row">
						<div className="col s12">
							<h3 className="white-text">
								First Name:
								<u>{verfiedUserDetails.firstname}</u>
							</h3>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<h3 className="white-text">
								Last Name: <u>{verfiedUserDetails.lastname} </u>
							</h3>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<h3 className="white-text">
								UserName: <u> {verfiedUserDetails.username} </u>
							</h3>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<h3 className="white-text">
								Email: <u> {verfiedUserDetails.emailID} </u>
							</h3>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfo;

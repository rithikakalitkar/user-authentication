import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserInfo from "./components/UserInfo/UserInfo";


const App = () => {
	const [landingPage, setLandingPage] = useState("SignUp");
	const [verfiedUserDetails, setVerfiedUserDetails] = useState();
	
	return (
		<>
			{landingPage === "Login" && <Login setLandingPage={setLandingPage} setVerfiedUserDetails={setVerfiedUserDetails} />}
			{landingPage === "SignUp" && <Register setLandingPage={setLandingPage} />}
			{landingPage === "UserInfo" && <UserInfo verfiedUserDetails={verfiedUserDetails} />}
		</>
	);
};

export default App;

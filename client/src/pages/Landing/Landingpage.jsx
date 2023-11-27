import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';

const Landingpage = () => {
	const [showLogin, setShowLogin] = useState(true);

	const handleToggleView = () => {
		setShowLogin(!showLogin);
	};

	return (
		<div>
			{showLogin ? (
				<Login onToggleView={handleToggleView} />
			) : (
				<Signup onToggleView={handleToggleView} />
			)}
		</div>
	);
};

export default Landingpage;

//START OF ORIGINAL CODE
// // import { Link } from 'react-router-dom';
// import { React } from 'react';
// import Login from '../../components/Login/Login';
// import Signup from '../../components/Signup/Signup';

// const Landingpage = () => {
// 	return (
// 		<div>
// 			<Login />
// 			<Signup />
// 		</div>
// 	);
// };

// export default Landingpage;

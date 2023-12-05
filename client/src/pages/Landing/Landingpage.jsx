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

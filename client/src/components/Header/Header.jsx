import { Link } from 'react-router-dom';
import React from "react";
import Navigation from '../Navigation/Navigation';
import spoderLogo from '../../assets/images/SPODER.png';
import './style.css';
import AuthService from '../../utils/auth';

function Header() {
	const isLoggedIn = AuthService.loggedIn();

	return (
		<nav className='text-white fixed top-0 left-0 w-full z-50'>
			<div className='container-fluid flex items-center'>
				<div className='flex items-center'>
					<img src={spoderLogo} alt='spider logo' className='mt-1 mr-2' width='50' height='50'></img>
					<div className='logo-navbar-brand'>theWeb</div>
				</div>
				{isLoggedIn && (
					<div className='ml-auto'>
						<div className='mr-3'>
							<Link to="#" className="logout-link" onClick={() => AuthService.logout()}>logout</Link>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Header;

// START OF ORIGINAL CODE
// import { Link } from 'react-router-dom';
// import React from "react";
// import Navigation from '../Navigation/Navigation';
// import spoderLogo from '../../assets/images/SPODER.png';
// import './style.css'

// function Header() {
// 	return (
// 		<nav className='text-white fixed w-full top-O'>
//             <div className='container flex items-center'>
// 				<img src={spoderLogo} alt='spider logo' className='mt-1 mr-2' width='50' height='50'></img>
// 				<div className='logo-navbar-brand'>theWeb</div>
// 			</div>
// 		</nav>
// 	);
// }
// export default Header;

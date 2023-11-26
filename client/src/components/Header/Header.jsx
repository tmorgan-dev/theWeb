import { Link } from 'react-router-dom';
import React from "react";
import Navigation from '../Navigation/Navigation';
import spoderLogo from '../../assets/images/SPODER.png';
import './style.css'

function Header() {
	return (
		<nav className='text-white fixed w-full top-O'>
            <div className='container flex items-center'>
				<img src={spoderLogo} alt='spider logo' className='mt-1 mr-2' width='50' height='50'></img>
				<div className='logo-navbar-brand'>theWeb</div>
			</div>
		</nav>
	);
}
export default Header;

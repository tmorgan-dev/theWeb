// import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Landingpage from './pages/Landing/Landingpage';
import Mainpage from './pages/Main/Mainpage';
import Footer from './components/Footer/Footer';


//needs appollo inports etc
import './App.css';

function App() {
	return (
		<>
			<Header />
			<Landingpage />
			{/* <Outlet /> */}
			//turning off outlet atm, causing multiple renders of same components
			<Mainpage />
			<Footer />
		</>
	);
}

export default App;

// import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Landingpage from './pages/Landingpage';
import Mainpage from './pages/Mainpage';


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
		</>
	);
}

export default App;

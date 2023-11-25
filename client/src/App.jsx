// import { useState } from 'react';
// import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Landingpage from './pages/Landingpage';
import './App.css';

function App() {
	return (
		<>
			<Header />

			<Landingpage />
			{/* <Outlet /> */}
		</>
	);
}

export default App;

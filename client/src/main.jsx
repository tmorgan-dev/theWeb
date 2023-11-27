//import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Outlet } from 'react-router-dom';
import './index.css';
import './pages/Main/style.css'

import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import Error from './pages/Error/Error.jsx'
//import Landing from './pages/Landing/Landingpage.jsx'
import Mainpage from './pages/Main/Mainpage'
import Landingpage from './pages/Landing/Landingpage';

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './pages/**/*.{html,js}',
//     './components/**/*.{html,js}',
//   ],
//   // ...
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* <Outlet /> */}
//     <App />
//   </React.StrictMode>,
// )

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landingpage />,
				//hold our signup function/signin function, should be the index page (first page to load)
			},
			{
				path: 'mainpage',
				element: <Mainpage />,
				//main page will hold the profile.feed/friendlist etc
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

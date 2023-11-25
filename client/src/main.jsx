import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Outlet } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Landing from '../src/pages/Landingpage.jsx'
import Mainpage from '../src/pages/Mainpage'
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
};

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
				element: <Landing />,
				//hold our signup function/signin function, should be the index page (first page to load)
			},
			{
				path: 'projects',
				element: <Mainpage />,
				//main page will hold the profile.feed/friendlist etc
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

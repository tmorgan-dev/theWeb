import ReactDOM from 'react-dom/client';
import './index.css';
import './pages/Main/style.css'

import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import Error from './pages/Error/Error.jsx'
import Mainpage from './pages/Main/Mainpage'
import Landingpage from './pages/Landing/Landingpage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landingpage />,
			},
			{
				path: '/mainpage',
				element: <Mainpage />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

//import React from 'react';
import spoderLogo from '../../assets/images/SPODER.png';
import './style.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutation';
// import { useNavigate } from "react-router-dom";

import Auth from '../../utils/auth'

const Login = ({ onToggleView }) => {
	// const navigate =  useNavigate()

	const [loginForm, setLoginData] = useState({ email: '', password: '' });
	const [loginUser, { error }] =
		useMutation(LOGIN_USER);
	// update state based on form input changes
	const handleChange = (event) => {
	const { name, value } = event.target;
	setLoginData({
		...loginForm,
		[name]: value,
	});
	};
	// submit form
	const handleFormSubmit = async (event) => {
	event.preventDefault();
	console.log(loginForm);
	try {
		const { data } = await loginUser({
			variables: { ...loginForm },
		});
		Auth.login(data.loginUser.token);
	console.log('anything')
		// navigate("/mainpage")
	
	} catch (e) {
		console.error(e);
	}
	// clear form values
	// setLoginData({
	// 	email: '',
	// 	password: '',
	// });
	};
	return (
		<div className='login min-h-screen flex items-center justify-center'>
			<div className='bg-white bg-opacity-20 px-8 shadow-md rounded-md w-96'>
				<img src={spoderLogo} alt='spider logo' width='278' height='180'></img>
				<h2 className='text-2xl font-bold mb-3'>Login</h2>
				<form onSubmit={handleFormSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-300 text-sm font-medium mb-2'
						>
							Username
						</label>
						<input
							type='text'
							id='email'
							name='email'
							className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500' value={loginForm.email}
							
							onChange={handleChange}
							
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-gray-300 text-sm font-medium mb-2'
						>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500' value={loginForm.password}
							onChange={handleChange}
							
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-purple-950 text-white p-1 rounded-md hover:bg-purple-400 focus:outline-none focus:shadow-outline-blue'
					>
						Login
					</button>
					<div className='register'>
						<p>Dont Have an Account?</p>
						{/*<p>
							<Link to="/landingpage">Register Here</Link>
						</p>*/}
						<button onClick={onToggleView} className='text-purple-300 hover:text-purple-200'>
							Register Here
	</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
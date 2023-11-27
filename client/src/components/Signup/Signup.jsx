import React, { useState } from 'react';
import spoderLogo from '../../assets/images/SPODER.png';
import './style.css';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutation';
import { useMutation } from '@apollo/client';

//pending login for usemutation and signup

const Signup = ({ onToggleView }) => {
	const [signupForm, setUserFormData] = useState({
	username: '',
	email: '',
	password: '',
	});
	// console.log(signupForm);
	const [createUser] = useMutation(ADD_USER);


	const handleInput = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...signupForm, [name]: value });
	};
		// console.log(signupForm);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			return;
		}

		try {
			const mutation = await createUser({
				variables: {
					username: signupForm.username,
					email: signupForm.email,
					password: signupForm.password,
				},
			});
			console.log(mutation);

			const token = mutation.data.createUser.token;
console.log(token);
			Auth.login(token);

		} catch (error) {
		console.error(error);
		}

	};

	return (
		<>
			<div className='signup min-h-screen flex items-center justify-center'>
				<div className='bg-white bg-opacity-20 px-8 shadow-md rounded-md w-96'>
					<img
						src={spoderLogo}
						alt='spider logo'
						width='278'
						height='180'
					></img>
					<h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
					<form onSubmit={handleFormSubmit}>
						<div className='mb-4'>
							<label
								htmlFor='username'
								className='block text-gray-300 text-sm font-medium mb-2'
							>
								User Name
							</label>
							<input
								type='text'
								id='username'
								name='username'
								value={signupForm.username}
								onChange={handleInput}
								className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
							/>
						</div>
						<div className='mb-4'>
							<label
								htmlFor='email'
								className='block text-gray-300 text-sm font-medium mb-2'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={signupForm.email}
								onChange={handleInput}
								className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
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
								value={signupForm.password}
								onChange={handleInput}
								className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
							/>
						</div>
						<button
							type='submit'
							className='w-full bg-purple-950 text-white p-1 rounded-md hover:bg-purple-400 focus:outline-none focus:shadow-outline-blue'
						>
							Sign Up
						</button>
						<div className='signin'>
            <p>Already Have an Account?</p>
            <button onClick={onToggleView} className='text-purple-300 hover:text-purple-200'>
                Login Here
            </button>
            </div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Signup;

// START OF ORIGNAL CODE
// import  React  from 'react';
// import spoderLogo from '../../assets/images/SPODER.png';
// import './style.css';
// import Auth from '../../utils/auth';
// import { ADD_USER } from '../../utils/mutation';
// import { useMutation } from '@apollo/client';
// import { useState } from 'react';

// //pending login for usemutation and signup

// const Signup = () => {
// 	const [signupForm, setUserFormData] = useState({
// 		username: '',
// 		email: '',
// 		password: '',
// 	});
// 	const [addUser] = useMutation(ADD_USER);


// 	const handleInput = (event) => {
// 		const { name, value } = event.target;
// 		setUserFormData({ ...signupForm, [name]: value });
// 	};
// 	const handleFormSubmit = async (event) => {
// 		event.preventDefault();
// 		setValidated(true);

// 		const form = event.currentTarget;
// 		if (form.checkValidity() === false) {
// 			event.stopPropagation();
// 			return;
// 		}

// 		try {
// 			const mutation = await addUser({
// 				variables: {
// 					username: setUserFormData.username,
// 					email: setUserFormData.email,
// 					password: setUserFormData.password,
// 				},
// 			});

// 			const token = mutation.data.addUser.token;
// 			Auth.login(token);
// 		} catch (error) {
// 			console.error(error);

// 		}

// 		setUserFormData({
// 			username: '',
// 			email: '',
// 			password: '',
// 		});
// 	};

// 	return (
// 		<>
// 			<div className='signup min-h-screen flex items-center justify-center'>
// 				<div className='bg-white bg-opacity-20 px-8 shadow-md rounded-md w-96'>
// 					<img
// 						src={spoderLogo}
// 						alt='spider logo'
// 						width='278'
// 						height='180'
// 					></img>
// 					<h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
// 					<form onSubmit={handleFormSubmit}>
// 						<div className='mb-4'>
// 							<label
// 								htmlFor='fullName'
// 								className='block text-gray-300 text-sm font-medium mb-2'
// 							>
// 								Full Name
// 							</label>
// 							<input
// 								type='text'
// 								id='fullName'
// 								name='fullName'
// 								value={signupForm.username}
// 								onChange={handleInput}
// 								className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
								
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								htmlFor='email'
// 								className='block text-gray-300 text-sm font-medium mb-2'
// 							>
// 								Email
// 							</label>
// 							<input
// 								type='email'
// 								id='email'
// 								name='email'
// 								value={signupForm.email}
// 								onChange={handleInput}
// 								className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								htmlFor='password'
// 								className='block text-gray-300 text-sm font-medium mb-2'
// 							>
// 								Password
// 							</label>
// 							<input
// 								type='password'
// 								id='password'
// 								name='password'
// 								value={signupForm.password}
// 								onChange={handleInput}
// 								className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
// 							/>
// 						</div>
// 						<button
// 							type='submit'
// 							className='w-full bg-purple-950 text-white p-1 rounded-md hover:bg-purple-400 focus:outline-none focus:shadow-outline-blue'
// 						>
// 							Sign Up
// 						</button>
// 						<div className='signin'>
// 							<p>Already Have an Account?</p>
// 							<a
// 								href=''
// 								className='text-purple-300 hover:text-purple-200'
// 							>
// 								Login Here
// 							</a>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Signup;
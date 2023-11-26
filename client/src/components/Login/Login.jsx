import { React } from 'react';
import spoderLogo from '../../assets/images/SPODER.png';
import './style.css'

//pending login for usemutation and signup
const Login = () => {
	return (
		<div className='login min-h-screen flex items-center justify-center'>
			<div className='bg-white bg-opacity-20 px-8 shadow-md rounded-md w-96'>
				<img src={spoderLogo} alt='spider logo' width='278' height='180'></img>
				<h2 className='text-2xl font-bold mb-3'>Login</h2>
				<form>
					<div className='mb-4'>
						<label
							htmlFor='username'
							className='block text-gray-300 text-sm font-medium mb-2'
						>
							Username
						</label>
						<input
							type='text'
							id='username'
							name='username'
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
							className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500'
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-purple-950 text-white p-1 rounded-md hover:bg-purple-400 focus:outline-none focus:shadow-outline-blue'
					>
						Login
					</button>
					<div className='register'>
						<p>Don't Have an Account?</p>
						<a href='' className='text-purple-300 hover:text-purple-200'>Register Here</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

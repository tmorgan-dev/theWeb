import { React } from 'react';

//pending login for usemutation and signup
const Login = () => {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='bg-white p-8 shadow-md rounded-md w-96'>
				<h2 className='text-2xl font-bold mb-4'>Login</h2>
				<form>
					<div className='mb-4'>
						<label
							htmlFor='username'
							className='block text-gray-600 text-sm font-medium mb-2'
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
							className='block text-gray-600 text-sm font-medium mb-2'
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
						className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;

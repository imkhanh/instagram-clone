import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginReq } from '../redux/actions/authAction';

const Login = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({ email: '', password: '' });
	const { email, password } = userData;

	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	useEffect(() => {
		if (auth.token) navigate('/');
	}, [auth.token, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(loginReq(userData));
	};

	return (
		<div className="fixed inset-0 bg-white z-50">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[360px] w-full h-auto bg-white border border-gray-100 rounded-sm py-4 px-8 shadow-md">
				<div className="mb-8">Login</div>
				<form onSubmit={handleSubmit} className="space-y-2">
					<div>
						<input type="text" name="email" value={email} onChange={handleChange} placeholder="Email address" className="px-4 text-sm w-full h-10 border border-gray-200 rounded-sm focus:outline-none" />
					</div>
					<div>
						<input type="password" name="password" value={password} onChange={handleChange} placeholder="Your password" className="px-4 text-sm w-full h-10 border border-gray-200 rounded-sm focus:outline-none" />
					</div>
					<button type="submit" className="text-sm w-full h-10 font-medium bg-black text-white rounded-sm">
						Login
					</button>
				</form>
				<div className="my-6 relative flex justify-center items-center">
					<div className="absolute top-1/2 left-0 w-[45%] h-[1px] bg-black/20"></div>
					<span className="text-black/20 font-light">or</span>
					<div className="absolute top-1/2 right-0 w-[45%] h-[1px] bg-black/20"></div>
				</div>
				<div className="flex items-center justify-center ">
					<button className="w-full h-10 bg-blue-600 text-white text-sm">Facebook</button>
				</div>
				<div className="mt-8">
					<p className="flex items-center justify-center text-xs text-black/50 font-light">
						You don't have an account?
						<Link to="/register" className="ml-1 hover:text-black underline">
							Register now
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;

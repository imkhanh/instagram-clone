import React, { useEffect, useState } from 'react';
import { loginReq } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram } from 'react-icons/io5';

const Login = () => {
	const navigate = useNavigate();
	const [showPass, setShowPass] = useState(false);
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
		<div className="fixed inset-0 bg-[#fafafa] z-50">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[340px] w-full h-auto">
				<div className="bg-white border border-black/10 rounded-sm py-4 px-10">
					<div className="mb-8 flex flex-col items-center justify-center">
						<IoLogoInstagram className="text-3xl" />
					</div>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="mb-1 block text-sm text-black/70">Email Address</label>

							<input type="text" name="email" value={email} onChange={handleChange} className="px-2 text-sm w-full h-10  border border-gray-200 rounded-sm focus:outline-none focus:border-black transition-colors" />
						</div>
						<div className="mb-4">
							<label className="mb-1 block text-sm text-black/70">Password</label>

							<div className="relative">
								<input type={showPass ? 'text' : 'password'} name="password" value={password} onChange={handleChange} className="px-2 text-sm w-full h-10  border border-gray-200 rounded-sm focus:outline-none focus:border-black transition-colors" />

								<span onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-2 transform -translate-y-1/2 select-none cursor-pointer text-black/40 hover:text-black text-xs">
									{showPass ? 'Hide' : 'Show'}
								</span>
							</div>
						</div>
						<button type="submit" className="text-sm w-full h-9 font-medium bg-[#267ccd] text-white rounded-sm">
							Login
						</button>
					</form>
					<div className="my-4 relative flex justify-center items-center">
						<div className="absolute top-1/2 left-0 w-[45%] h-[1px] bg-black/20"></div>
						<span className="text-black/20 font-light">or</span>
						<div className="absolute top-1/2 right-0 w-[45%] h-[1px] bg-black/20"></div>
					</div>
					<div className="flex items-center justify-center ">
						<button className="w-full h-10 text-[#1d4f7e] bg-white flex items-center justify-center">
							<IoLogoFacebook />
							<span className="ml-1 text-sm font-medium">Login with facebook</span>
						</button>
					</div>
				</div>

				<div className="mt-4 py-6 flex items-center justify-center bg-white border border-black/10 rounded-sm">
					<p className="text-sm text-black">
						You don't have an account?
						<Link to="/register" className="ml-1 text-[#267ccd] font-medium">
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;

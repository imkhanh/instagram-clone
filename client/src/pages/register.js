import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { registerReq } from '../redux/actions/authAction';

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const [userData, setUserData] = useState({ fullname: '', username: '', email: '', password: '', confirmPassword: '' });
	const { fullname, username, email, password, confirmPassword } = userData;
	const { alert } = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(registerReq(userData));
	};

	return (
		<div className="fixed inset-0 bg-[#fafafa] z-50">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[380px] w-full h-auto">
				<div className="bg-white border border-black/10 rounded-sm py-4 px-10">
					<div className="mb-8 flex flex-col items-center justify-center">
						<IoLogoInstagram className="text-3xl" />
					</div>
					<div className="mb-10">
						<div className="my-4 relative flex justify-center items-center">
							<div className="absolute top-1/2 left-0 w-[45%] h-[1px] bg-black/20"></div>
							<span className="text-black/20 font-light">or</span>
							<div className="absolute top-1/2 right-0 w-[45%] h-[1px] bg-black/20"></div>
						</div>
						<div className="flex items-center justify-center ">
							<button className="w-full h-9 bg-[#1d4f7e] text-white flex items-center justify-center rounded-sm">
								<IoLogoFacebook />
								<span className="ml-1 text-sm font-medium">Login with facebook</span>
							</button>
						</div>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="mb-1 block text-sm text-black/70">Full name</label>
							<input
								type="text"
								name="fullname"
								value={fullname}
								onChange={handleChange}
								className="px-4 text-sm w-full h-10  border border-gray-200 rounded-sm focus:outline-none focus:border-black"
								style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}`, borderColor: `${alert.fullname ? '#fd2d6a14' : ''}` }}
							/>
							{alert.fullname && <span className="mt-1 block text-xs font-light text-red-500">* {alert.fullname}</span>}
						</div>
						<div className="mb-4">
							<label className="mb-1 block text-sm text-black/70">User name</label>

							<input
								type="text"
								name="username"
								value={username}
								onChange={handleChange}
								className="px-4 text-sm w-full h-10  border border-gray-200 rounded-sm focus:outline-none focus:border-black"
								style={{ background: `${alert.username ? '#fd2d6a14' : ''}`, borderColor: `${alert.username ? '#fd2d6a14' : ''}` }}
							/>
							{alert.username && <span className="mt-1 block text-xs font-light text-red-500">* {alert.username}</span>}
						</div>
						<div className="mb-4">
							<label className="mb-1 block text-sm text-black/70">Email Address</label>

							<input
								type="text"
								name="email"
								value={email}
								onChange={handleChange}
								className="px-4 text-sm w-full h-10  border border-gray-200 rounded-sm focus:outline-none focus:border-black"
								style={{ background: `${alert.email ? '#fd2d6a14' : ''}`, borderColor: `${alert.email ? '#fd2d6a14' : ''}` }}
							/>
							{alert.email && <span className="mt-1 block text-xs font-light text-red-500">* {alert.email}</span>}
						</div>
						<div className="mb-4">
							<label className="mb-1 block text-sm text-black/70">Password</label>

							<div className="relative">
								<input
									type={showPass ? 'text' : 'password'}
									name="password"
									value={password}
									onChange={handleChange}
									className="px-4 text-sm w-full h-10  border border-gray-200 rounded-sm focus:outline-none focus:border-black"
									style={{ background: `${alert.password ? '#fd2d6a14' : ''}`, borderColor: `${alert.password ? '#fd2d6a14' : ''}` }}
								/>

								<span onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-2 transform -translate-y-1/2 select-none cursor-pointer text-black/40 hover:text-black text-xs">
									{showPass ? 'Hide' : 'Show'}
								</span>
							</div>
							{alert.password && <span className="mt-1 block text-xs font-light text-red-500">* {alert.password}</span>}
						</div>
						<div className="mb-4">
							<label className="mb-1 block text-sm text-black/70">Confirm Password</label>

							<div className="relative">
								<input
									type={showConfirmPass ? 'text' : 'password'}
									name="confirmPassword"
									value={confirmPassword}
									onChange={handleChange}
									className="px-4 text-sm w-full h-10  border border-gray-200 rounded-sm focus:outline-none focus:border-black"
									style={{ background: `${alert.confirmPassword ? '#fd2d6a14' : ''}`, borderColor: `${alert.confirmPassword ? '#fd2d6a14' : ''}` }}
								/>

								<span onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute top-1/2 right-2 transform -translate-y-1/2 select-none cursor-pointer text-black/40 hover:text-black text-xs">
									{confirmPassword ? 'Hide' : 'Show'}
								</span>
							</div>
							{alert.confirmPassword && <span className="mt-1 block text-xs font-light text-red-500">* {alert.confirmPassword}</span>}
						</div>
						<button type="submit" className="text-sm w-full h-9 font-medium bg-[#3395f0] text-white rounded-sm">
							Register
						</button>
					</form>
				</div>

				<div className="mt-4 py-6 flex items-center justify-center bg-white border border-black/10 rounded-sm">
					<p className=" text-sm text-black">
						Already an account?
						<Link to="/login" className="ml-1 text-[#267ccd] font-medium">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;

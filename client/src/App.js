import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { refreshToken } from './redux/actions/authAction';

import PageRender from './components/CustomRouter/PageRender';
import Header from './components/Header/Header';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Alert from './components/Alert/Alert';

const App = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);

	useEffect(() => {
		dispatch(refreshToken());
	}, [dispatch]);

	return (
		<>
			<Alert />
			<BrowserRouter>
				{auth.token && <Header />}
				<main className="pt-[60px] bg-[#fafafa]" style={{ minHeight: 'calc(100vh)' }}>
					<Routes>
						<Route path="/" element={auth.token ? <Home /> : <Login />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/:page" element={<PageRender />} />
						<Route path="/:page/:id" element={<PageRender />} />
					</Routes>
				</main>
			</BrowserRouter>
		</>
	);
};

export default App;

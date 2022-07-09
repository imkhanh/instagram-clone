import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageRender from './components/CustomRouter/PageRender';

import Header from './components/Header/Header';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className="pt-[60px]" style={{ minHeight: 'calc(100vh)' }}>
				<Routes>
					<Route path="/:page" element={<PageRender />} />
					<Route path="/:page/:id" element={<PageRender />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;

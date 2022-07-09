import React from 'react';

import { Link } from 'react-router-dom';
import Search from './Search';
import Menu from './Menu';

const Header = () => {
	return (
		<header className="fixed top-0 left-0 h-[60px] w-full bg-white border-b border-gray-200 z-20">
			<nav className="h-full max-w-[920px] mx-auto flex items-center justify-between">
				<div className="w-1/3">
					<Link to="/">Instagram</Link>
				</div>
				<Search />
				<Menu />
			</nav>
		</header>
	);
};

export default Header;

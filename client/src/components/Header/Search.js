import React from 'react';
import { IoSearchOutline, IoCloseCircleSharp } from 'react-icons/io5';

const Search = () => {
	return (
		<div className="relative w-1/3 px-4">
			<span className="absolute top-1/2 left-8 transform -translate-y-1/2 text-black/20">
				<IoSearchOutline className="text-xl" />
			</span>
			<input className="pl-12 text-sm w-full h-9 text-black bg-gray-100 rounded-lg focus:outline-none" placeholder="Search" />

			<span className="absolute top-1/2 right-8 transform -translate-y-1/2 text-black/20 cursor-pointer select-none">
				<IoCloseCircleSharp className="text-xl" />
			</span>
		</div>
	);
};

export default Search;

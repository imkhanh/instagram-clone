import React from 'react';
import { IoHomeOutline, IoHeartOutline, IoCompassOutline, IoChatbubbleOutline, IoHome, IoChatbubble, IoCompass, IoHeart } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
	const location = useLocation();

	return (
		<div className="w-1/3 flex items-center justify-end space-x-5">
			<Link to="/home">{location.pathname === '/home' ? <IoHome className="text-[26px]" /> : <IoHomeOutline className="text-[26px]" />}</Link>
			<Link to="/message">{location.pathname === '/message' ? <IoChatbubble className="text-[26px]" /> : <IoChatbubbleOutline className="text-[26px]" />}</Link>

			<Link to="/explore">{location.pathname === '/explore' ? <IoCompass className="text-[26px]" /> : <IoCompassOutline className="text-[26px]" />}</Link>
			<Link to="/heart">{location.pathname === '/heart' ? <IoHeart className="text-[26px]" /> : <IoHeartOutline className="text-[26px]" />}</Link>
			<div>
				<img src="https://media.bongda.com.vn/files/hai.phan/2021/09/26/jadon-sancho-2045.jpg" alt="photoUrl" className="w-6 h-6 rounded-full object-cover border border-white cursor-pointer" />
			</div>
		</div>
	);
};

export default Menu;

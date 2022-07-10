import React from 'react';
import { IoHomeOutline, IoHeartOutline, IoCompassOutline, IoChatbubbleOutline, IoHome, IoChatbubble, IoCompass, IoHeart } from 'react-icons/io5';
import { BsBookmark, BsGear, BsPersonCircle } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutReq } from '../../redux/actions/authAction';
import useClickOutside from '../../utils/useClickOutside';

const Menu = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);
	const { menuRef, isVisible, setIsVisible } = useClickOutside();

	return (
		<div className="w-1/3 flex items-center justify-end space-x-5">
			<Link to="/">{location.pathname === '/' ? <IoHome className="text-[26px]" /> : <IoHomeOutline className="text-[26px]" />}</Link>
			<Link to="/message">{location.pathname === '/message' ? <IoChatbubble className="text-[26px]" /> : <IoChatbubbleOutline className="text-[26px]" />}</Link>
			<Link to="/explore">{location.pathname === '/explore' ? <IoCompass className="text-[26px]" /> : <IoCompassOutline className="text-[26px]" />}</Link>
			<Link to="/heart">{location.pathname === '/heart' ? <IoHeart className="text-[26px]" /> : <IoHeartOutline className="text-[26px]" />}</Link>
			<div ref={menuRef} className="relative">
				<div onClick={() => setIsVisible(!isVisible)} className="select-none cursor-pointer">
					<img src={auth.user && auth.user.avatar} alt="photoUrl" className={`p-[1px] w-7 h-7 rounded-full object-cover border ${isVisible ? 'border-black' : 'border-white'}`} />
				</div>

				{isVisible && (
					<div className="absolute top-12 left-full transform -translate-x-full w-52 h-auto border border-gray-100 shadow-md rounded-md">
						<Link to={`/profile/${auth.user._id}`} onClick={() => setIsVisible(!isVisible)} className="py-2 px-4 text-gray-700 flex items-center hover:text-black hover:bg-gray-50">
							<BsPersonCircle />
							<span className="ml-4 text-sm">Profile</span>
						</Link>
						<Link to="/" className="py-2 px-4 text-gray-700 flex items-center hover:text-black hover:bg-gray-50">
							<BsGear />
							<span className="ml-4 text-sm">Setting</span>
						</Link>
						<Link to="/" className="py-2 px-4 text-gray-700 flex items-center hover:text-black hover:bg-gray-50">
							<BsBookmark />
							<span className="ml-4 text-sm">Save</span>
						</Link>
						<div onClick={() => dispatch(logoutReq())} className="py-2 flex items-center text-gray-700 border-t border-gray-200 hover:text-black hover:bg-gray-50 cursor-pointer select-none">
							<span className="ml-4 text-sm">Logout</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Menu;

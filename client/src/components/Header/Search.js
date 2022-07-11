import React, { useEffect, useState } from 'react';
import { IoSearchOutline, IoCloseCircleSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../utils/FetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { Link } from 'react-router-dom';
import LoadingIcon from '../../loading.gif';

const Search = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');

	const { auth } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, [search, auth.token, dispatch]);

	const fetchData = async () => {
		setLoading(true);

		try {
			const res = await getData(`search?username=${search}`, auth.token);
			setUsers(res.data.users);
			setLoading(false);
		} catch (error) {
			dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
		}
	};

	const handleClose = () => {
		setSearch('');
		setUsers([]);
	};

	return (
		<div className="relative w-1/3 px-4 md:hidden">
			<span className={`${search && 'hidden'} absolute top-1/2 left-8 transform -translate-y-1/2 text-black/20`}>
				<IoSearchOutline className="text-xl" />
			</span>

			<input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} className={`${search ? 'pl-4' : 'pl-12'}  text-sm w-full h-9 text-black bg-gray-100 rounded-lg focus:outline-none`} placeholder="Search" />

			<span className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-gray-100 text-black/20 cursor-pointer select-none">
				{loading ? (
					<img src={LoadingIcon} alt="laodingIcon" className="w-4" />
				) : (
					search && (
						<span onClick={handleClose}>
							<IoCloseCircleSharp className="text-xl" />
						</span>
					)
				)}
			</span>

			{search && (
				<div className="py-2 absolute top-14 left-1/2 transform -translate-x-1/2 h-auto w-96 border border-gray-200 shadow-md bg-white rounded-md">
					{users.length > 0 ? (
						users.map((user) => {
							return (
								<Link to={`/profile/${user._id}`} key={user._id} onClick={handleClose} className="py-2 px-4 flex items-center bg-white hover:bg-[#fafafa]">
									<img src={auth.user.avatar} alt={user.username} className="w-12 h-12 rounded-full p-[2px] border border-gray-200" />
									<div className="ml-2">
										<p className="text-sm font-medium">{user.username}</p>
										<p className="text-sm text-black/50">{user.fullname}</p>
									</div>
								</Link>
							);
						})
					) : (
						<div className="h-full py-8 text-sm text-black/50 flex items-center justify-center">User not found</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Search;

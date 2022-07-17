import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../redux/actions/profileAction';
import FollowButton from './FollowButton';
import EditProfileModal from './EditProfileModal';

const Infor = () => {
	const { id } = useParams();
	const { profile, auth } = useSelector((state) => state);
	const [users, setUsers] = useState([]);
	const [onEdit, setOnEdit] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (auth.user._id === id) {
			setUsers([auth.user]);
		} else {
			dispatch(getProfileUser({ users: profile.users, id, auth }));
			const newUserData = profile.users.filter((user) => user._id === id);
			setUsers(newUserData);
		}
	}, [id, dispatch, auth, profile.users]);

	return (
		<>
			{users.length > 0 &&
				users.map((user) => {
					return (
						<div key={user._id} className="py-6 flex items-start">
							<div className="w-1/3 flex justify-center">
								<img src={user.avatar} alt={user.username} className="p-1 w-[162px] h-[162px] object-cover border-2 border-black/5 rounded-full" />
							</div>
							<div className="w-2/3 px-2">
								<div className="mt-4 flex items-center space-x-10">
									<h1 className="text-2xl">{user.username}</h1>
									{user._id === auth.user._id ? (
										<button onClick={() => setOnEdit(!onEdit)} className="text-sm py-1 px-3 border border-gray-300 rounded-[3px] font-medium">
											Edit Profile
										</button>
									) : (
										<FollowButton />
									)}
								</div>
								<div className="py-4 grid grid-cols-3">
									<div className="cursor-pointer select-none">
										<span className="font-medium">0</span>
										<span className="ml-1">posts</span>
									</div>
									<div className="cursor-pointer select-none">
										<span className="font-medium">{user.following.length}</span>
										<span className="ml-1">following</span>
									</div>
									<div className="cursor-pointer select-none">
										<span className="font-medium">{user.followers.length}</span>
										<span className="ml-1">followers</span>
									</div>
								</div>
								<div>
									<p className="font-semibold">{user.fullname}</p>
									<p>{user.email}</p>
									<p>{user.phone}</p>
									<a href={user.website} target="_blank" rel="noreferrer" className="text-blue-500">
										{user.website}
									</a>
									<p>{user.address}</p>
									<p>{user.story}</p>
								</div>
							</div>
							{onEdit && <EditProfileModal setOnEdit={setOnEdit} />}
						</div>
					);
				})}
		</>
	);
};

export default Infor;

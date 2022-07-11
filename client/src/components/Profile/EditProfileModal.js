import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { editProfileUser } from '../../redux/actions/profileAction';
import { checkImage } from '../../utils/ImageUpload';

const EditProfileModal = ({ user, setOnEdit }) => {
	const [userData, setUserData] = useState({ fullname: '', username: '', phone: '', website: '', story: '', gender: 'male', address: '' });
	const [avatar, setAvatar] = useState('');

	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);

	useEffect(() => {
		setUserData(auth.user);
	}, [auth.user]);

	const handleChangeAvatar = (e) => {
		const file = e.target.files[0];
		const err = checkImage(file);

		if (err) {
			return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
		}
		setAvatar(file);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...setUserData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(editProfileUser({ userData, auth, avatar }));
	};

	return (
		<div>
			<div className="fixed inset-0 bg-black opacity-50 z-30" onClick={() => setOnEdit(false)} />
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg w-full h-auto border border-gray-200 rounded-md bg-white shadow-lg z-40">
				<div className="p-4 flex items-center justify-center">
					<h4 className="font-bold text-lg">Edit Profile</h4>
				</div>
				<form onSubmit={handleSubmit} className="py-4 px-8 space-y-6">
					<div className="flex">
						<div className="mr-4 w-1/5 flex justify-end">
							<img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt={auth.user.username} className="p-[1px] w-12 h-12 rounded-full border border-gray-200 object-cover" />
						</div>
						<div className="w-4/5">
							<span className="text-lg font-medium">{user.username}</span>
							<div className="relative">
								<input type="file" multiple={false} accept="image/*" className="absolute top-1/2 transform -translate-y-1/2 left-0 opacity-0" onChange={handleChangeAvatar} />
								<span className="text-[#0095F6] text-sm font-medium cursor-pointer">Change profile photo</span>
							</div>
						</div>
					</div>

					<div className="flex">
						<div className="mr-4 w-1/5 flex justify-end">
							<label className="mb-1 block text-sm font-semibold">Name</label>
						</div>
						<div className="w-4/5">
							<input type="text" name="fullname" value={userData.fullname} onChange={handleChange} className="px-2 w-full h-9 text-sm border border-gray-300 rounded-sm outline-none focus:border-black" />
							<div className="mt-2 space-y-2">
								<span className="text-xs text-black/50 block">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</span>
								<span className="text-xs text-black/50 block">You can only change your name twice within 14 days.</span>
							</div>
						</div>
					</div>

					<div className="flex">
						<div className="mr-4 w-1/5 flex justify-end">
							<label className="mb-1 block text-sm font-semibold">Username</label>
						</div>
						<div className="w-4/5">
							<input type="text" name="username" value={userData.username} onChange={handleChange} className="px-2 w-full h-9 text-sm border border-gray-300 rounded-sm outline-none focus:border-black" />
							<div className="mt-2 space-y-2">
								<span className="text-xs text-black/50 block">In most cases, you'll be able to change your username back to {user.username} for another 14 days.</span>
							</div>
						</div>
					</div>

					<div className="flex">
						<div className="mr-4 w-1/5 flex justify-end">
							<label className="mb-1 block text-sm font-semibold">Address</label>
						</div>
						<div className="w-4/5">
							<input type="text" name="address" value={userData.address} onChange={handleChange} className="px-2 w-full h-9 text-sm border border-gray-300 rounded-sm outline-none focus:border-black" />
						</div>
					</div>

					<div className="flex">
						<div className="mr-4 w-1/5 flex justify-end">
							<label className="mb-1 block text-sm font-semibold">Story</label>
						</div>
						<div className="w-4/5">
							<textarea rows={4} type="text" name="story" value={userData.story} onChange={handleChange} className="pt-2 px-2 w-full text-sm border border-gray-300 rounded-sm outline-none focus:border-black" />
						</div>
					</div>

					<div className="flex">
						<div className="mr-4 w-1/5 flex justify-end">
							<label className="mb-1 block text-sm font-semibold">Phone</label>
						</div>
						<div className="w-4/5">
							<input type="text" name="phone" value={userData.phone} onChange={handleChange} className="px-2 w-full h-9 text-sm border border-gray-300 rounded-sm outline-none focus:border-black" />
						</div>
					</div>

					<div className="flex">
						<div className="mr-4 w-1/5 flex justify-end">
							<label className="mb-1 block text-sm font-semibold">Website</label>
						</div>
						<div className="w-4/5">
							<input type="text" name="website" value={userData.website} onChange={handleChange} className="px-2 w-full h-9 text-sm border border-gray-300 rounded-sm outline-none focus:border-black" />
						</div>
					</div>

					<div className="flex">
						<div className="mr-4 w-1/5 flex justify-end">
							<label className="mb-1 block text-sm font-semibold">Gender</label>
						</div>
						<div className="w-4/5">
							<input type="text" name="gender" value={userData.gender} onChange={handleChange} className="px-2 w-full h-9 text-sm border border-gray-300 rounded-sm outline-none focus:border-black" />
						</div>
					</div>
					<div className="flex">
						<div className="mr-4 w-1/5"></div>
						<div className="w-4/5">
							<button type="submit" className="py-2 px-6 font-medium bg-[#0095F6] text-white rounded-sm text-sm">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProfileModal;

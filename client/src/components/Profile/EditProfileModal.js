import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { editProfileUser } from '../../redux/actions/profileAction';
import { checkImage } from '../../utils/ImageUpload';
import InputField from './InputField';

const initialState = { fullname: '', username: '', phone: '', website: '', story: '', gender: '', address: '' };

const EditProfileModal = ({ user, setOnEdit }) => {
	const [userData, setUserData] = useState(initialState);
	const { fullname, username, phone, website, story, gender, address } = userData;

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
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl w-full h-auto border border-gray-200 rounded-md bg-white shadow-lg z-40">
				<div className="p-4 flex items-center justify-center">
					<h4 className="font-semibold uppercase text-sm">Edit Profile</h4>
				</div>
				<form onSubmit={handleSubmit} className="py-4 px-8">
					<div className="mb-6 flex items-center ">
						<div className="mr-4 w-1/5 flex justify-end">
							<img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt={auth.user.username} className="p-[1px] w-12 h-12 rounded-full object-cover" />
						</div>
						<div className="w-4/5">
							<span className="font-medium">{user.username}</span>
							<div className="relative">
								<input type="file" multiple={false} accept="image/*" className="absolute top-1/2 transform -translate-y-1/2 left-0 opacity-0" onChange={handleChangeAvatar} />
								<span className="text-[#0095F6] text-sm font-medium cursor-pointer">Change profile photo</span>
							</div>
						</div>
					</div>
					<InputField label="Fullname" type="text" name="fullname" value={fullname} onChange={handleChange} />
					<div className="mb-6 flex">
						<div className="mr-4 w-1/5 flex justify-end"></div>
						<div className="w-4/5">
							<div className="mt-2 space-y-2">
								<span className="text-xs text-black/50 block">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</span>
								<span className="text-xs text-black/50 block">You can only change your name twice within 14 days.</span>
							</div>
						</div>
					</div>
					<InputField label="Username" type="text" name="username" value={username} onChange={handleChange} />
					<div className="mb-6 flex">
						<div className="mr-4 w-1/5 flex justify-end"></div>
						<div className="w-4/5">
							<div className="mt-2 space-y-2">
								<span className="text-xs text-black/50 block">In most cases, you'll be able to change your username back to {user.username} for another 14 days.</span>
							</div>
						</div>
					</div>
					<InputField marginBottom="mb-6" label="Address" type="text" name="address" value={address} onChange={handleChange} />
					<InputField marginBottom="mb-6" label="Story" type="textarea" name="story" value={story} onChange={handleChange} />
					<InputField marginBottom="mb-6" label="Phone" type="text" name="phone" value={phone} onChange={handleChange} />
					<InputField marginBottom="mb-6" label="Website" type="text" name="website" value={website} onChange={handleChange} />
					<InputField marginBottom="mb-6" label="Gender" type="select" name="gender" value={gender} onChange={handleChange} />
					<div className="flex items-center">
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

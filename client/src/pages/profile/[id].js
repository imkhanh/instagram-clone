import React from 'react';
import { useSelector } from 'react-redux';
import Infor from '../../components/Profile/Infor';
import Posts from '../../components/Profile/Posts';
import LoadingIcon from '../../loading.gif';

const Profile = () => {
	const { profile } = useSelector((state) => state);

	return (
		<div className="max-w-[940px] mx-auto">
			{profile.loading ? <img src={LoadingIcon} alt="" /> : <Infor />}
			<Posts />
		</div>
	);
};

export default Profile;

import React from 'react';
import { useSelector } from 'react-redux';
import Infor from '../../components/Profile/Infor';
import Posts from '../../components/Profile/Posts';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
	barColors: {
		0: '#fff',
		0.2: '#000',
		0.4: '#333',
		0.6: '#222',
		0.8: '#111',
		1: '#000',
	},
});

const Profile = () => {
	const { profile } = useSelector((state) => state);

	return (
		<div className="max-w-[940px] mx-auto">
			{profile.loading ? <TopBarProgress /> : <Infor />}
			<Posts />
		</div>
	);
};

export default Profile;

import React, { useState } from 'react';

const FollowButton = () => {
	const [followed, setFollowed] = useState(false);

	const handleFollow = () => {
		setFollowed(true);
	};

	const handleUnFollow = () => {
		setFollowed(false);
	};

	return (
		<div>
			{followed ? (
				<button onClick={handleUnFollow} className="text-sm py-1 px-3 border-blue-500 bg-blue-500 text-white rounded-[3px] font-medium">
					Un Follow
				</button>
			) : (
				<button onClick={handleFollow} className="text-sm py-1 px-3 border border-blue-500 bg-blue-500 text-white rounded-[3px] font-medium">
					Follow
				</button>
			)}
		</div>
	);
};

export default FollowButton;

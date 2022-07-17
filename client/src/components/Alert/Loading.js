import React from 'react';
import LoadingIcon from '../../loading.gif';

const Loading = () => {
	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[199]">
			<img src={LoadingIcon} alt="loadingIcon" className="w-7" />
		</div>
	);
};

export default Loading;

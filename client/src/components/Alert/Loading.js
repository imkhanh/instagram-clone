import React from 'react';

const Loading = () => {
	return (
		<div className="fixed inset-0 bg-white">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Loading</div>
		</div>
	);
};

export default Loading;

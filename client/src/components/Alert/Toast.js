import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Toast = ({ msg, handleClose, bgColor }) => {
	return (
		<div className="fixed top-2 right-2 w-52 h-auto rounded-[3px] z-[60]" style={{ background: `${bgColor}` }}>
			<div className="py-2 px-4 flex items-center justify-between border-b border-white">
				<span className="text-sm font-semibold text-white">{msg.title}</span>
				<span onClick={handleClose} className="text-white cursor-pointer select-none">
					<IoCloseOutline className="text-xl" />
				</span>
			</div>
			<div className="p-4">
				<p className="text-sm text-white">{msg.body}</p>
			</div>
		</div>
	);
};

export default Toast;

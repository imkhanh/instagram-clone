import React from 'react';

const Input = ({ marginBottom, label, type, name, value, onChange }) => {
	return (
		<div className={`${marginBottom} flex items-center`}>
			<div className="mr-4 w-1/5 flex justify-end">
				<label className="mb-1 block text-sm font-semibold">{label}</label>
			</div>
			<div className="w-4/5">
				{type === 'select' ? (
					<select name={name} value={value} onChange={onChange} className="px-2 w-full h-10 text-sm border border-gray-300 rounded-sm outline-none focus:border-black transition-colors">
						<option>Male</option>
						<option>Female</option>
					</select>
				) : type === 'textarea' ? (
					<textarea rows={4} name={name} value={value} onChange={onChange} className="pt-2 px-2 w-full text-sm border border-gray-300 rounded-sm outline-none focus:border-black transition-colors" />
				) : (
					<input type={type} name={name} value={value} onChange={onChange} className="px-2 w-full h-10 text-sm border border-gray-300 rounded-sm outline-none focus:border-black transition-colors" />
				)}
			</div>
		</div>
	);
};

export default Input;

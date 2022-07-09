import React from 'react';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const Alert = () => {
	const { alert } = useSelector((state) => state);
	console.log(alert);

	return <div>{alert.loading && <Loading />}</div>;
};

export default Alert;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Loading from './Loading';
import Toast from './Toast';

const Alert = () => {
	const { alert } = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<>
			{alert.loading && <Loading />}
			{alert.error && <Toast msg={{ title: 'Error', body: alert.error }} handleClose={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })} bgColor="#ef4444" />}
			{alert.success && <Toast msg={{ title: 'Success', body: alert.success }} handleClose={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })} bgColor="#22c55e" />}
		</>
	);
};

export default Alert;

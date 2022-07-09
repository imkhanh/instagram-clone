import { postData } from '../../utils/FetchData';

export const loginReq = (data) => async (dispatch) => {
	dispatch({ type: 'ALERT', payload: { loading: true } });
	try {
		const res = await postData('login', data);
		dispatch({
			type: 'AUTH',
			payload: {
				token: res.data.access_token,
				user: res.data.user,
			},
		});
		localStorage.setItem('jwt', JSON.stringify(res.data.access_token));

		dispatch({ type: 'ALERT', payload: { success: res.data.msg } });
		dispatch({ type: 'ALERT', payload: { loading: false } });
	} catch (error) {
		dispatch({ type: 'ALERT', payload: { error: error.response.data.msg } });
	}
};

export const registerReq = (data) => async (dispatch) => {};

export const refreshToken = () => async (dispatch) => {
	const getToken = localStorage.getItem('jwt');
	if (getToken) {
		dispatch({ type: 'ALERT', payload: { loading: true } });
		try {
			const res = await postData('refresh_token');
			dispatch({
				type: 'AUTH',
				payload: {
					token: res.data.access_token,
					user: res.data.user,
				},
			});

			dispatch({ type: 'ALERT', payload: {} });
			dispatch({ type: 'ALERT', payload: { loading: false } });
		} catch (error) {
			dispatch({ type: 'ALERT', payload: { error: error.response.data.msg } });
		}
	}
};

export const logoutReq = () => async (dispatch) => {
	try {
		const res = await postData('logout');
		dispatch({ type: 'ALERT', payload: { success: res.data.msg } });
	} catch (error) {
		dispatch({ type: 'ALERT', payload: error.response.data.msg });
	}
};

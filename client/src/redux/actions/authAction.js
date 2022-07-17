import { postData } from '../../utils/FetchData';
import { GLOBALTYPES } from './globalTypes';
import validate from '../../utils/Validate';

export const loginReq = (data) => async (dispatch) => {
	dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

	try {
		const res = await postData('login', data);
		dispatch({
			type: GLOBALTYPES.AUTH,
			payload: {
				token: res.data.access_token,
				user: res.data.user,
			},
		});
		localStorage.setItem('jwt', JSON.stringify(res.data.access_token));
		dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
	} catch (error) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
	}
};

export const registerReq = (data) => async (dispatch) => {
	const check = validate(data);

	if (check.errLength > 0) {
		return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
	}
	dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

	try {
		const res = await postData('register', data);
		dispatch({
			type: GLOBALTYPES.AUTH,
			payload: {
				token: res.data.access_token,
				user: res.data.user,
			},
		});
		localStorage.setItem('jwt', JSON.stringify(res.data.access_token));

		dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
		dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
	} catch (error) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
	}
};

export const refreshToken = () => async (dispatch) => {
	const getToken = localStorage.getItem('jwt');
	if (getToken) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
		try {
			const res = await postData('refresh_token');
			dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user } });

			dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
			dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
		} catch (error) {
			dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
		}
	}
};

export const logoutReq = () => async (dispatch) => {
	try {
		await postData('logout');
		localStorage.removeItem('jwt');
		window.location.href = '/';
	} catch (error) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: error.response.data.msg });
	}
};

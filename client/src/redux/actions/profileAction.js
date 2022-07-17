import { GLOBALTYPES } from './globalTypes';
import { getData, patchData } from '../../utils/FetchData';
import { imageUpload } from '../../utils/ImageUpload';

export const PROFILE_TYPES = {
	LOADING: 'LOADING',
	GET_USER: 'GET_USER',
	FOLLOW: 'FOLLOW',
	UNFOLLOW: 'UNFOLLOW',
};

export const getProfileUser =
	({ users, id, auth }) =>
	async (dispatch) => {
		if (users.every((user) => user._id !== id)) {
			try {
				dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
				const res = await getData(`/get-user/${id}`, auth.token);
				dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });

				dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
			} catch (error) {
				dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
			}
		}
	};

export const editProfileUser =
	({ userData, auth, avatar }) =>
	async (dispatch) => {
		dispatch({ type: PROFILE_TYPES.LOADING, payload: true });

		try {
			let media;
			if (avatar) media = await imageUpload([avatar]);
			const res = await patchData(`/edit-user/${auth.user._id}`, { ...userData, avatar: avatar ? media[0].url : auth.user.avatar }, auth.token);
			dispatch({
				type: GLOBALTYPES.AUTH,
				payload: {
					...auth,
					user: { ...auth.user, ...userData, avatar: avatar ? media[0].url : auth.user.avatar },
				},
			});

			dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
			dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
		} catch (error) {
			dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
		}
	};

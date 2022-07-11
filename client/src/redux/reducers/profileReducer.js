import { PROFILE_TYPES } from '../actions/profileAction';

const initialState = {
	posts: [],
	users: [],
	loading: false,
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_TYPES.LOADING:
			return { ...state, loading: action.payload };
		case PROFILE_TYPES.GET_USER:
			return { ...state, users: [...state.users, action.payload.user] };
		default:
			return state;
	}
};

export default profileReducer;

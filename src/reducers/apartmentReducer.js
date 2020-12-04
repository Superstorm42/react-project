import * as Types from '../actions/reducerTypes';
const initialState = {
	apartment: {},
	allApartments: [],
};
export default function (state = initialState, action) {
	switch (action.type) {
		case Types.GET_APARTMENT:
			return { ...state, apartment: action.payload };
		case Types.GET_ALL_APARTMENTS:
			return { ...state, allApartments: action.payload };
		case Types.SET_APARTMENT:
			return { ...state, apartment: action.payload };
		case Types.DELETE_APARTMENT:
			return { ...state, apartment: action.payload };
		case Types.CLEAR_APARTMENT:
			return { ...state, apartment: {} };
		case Types.CLEAR_ALL_APARTMENTS:
			return { ...state, allApartments: [] };

		default:
			return state;
	}
}

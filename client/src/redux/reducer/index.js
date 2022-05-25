import { GET_LOCATIONS, SET_CITY } from "../actions";

const initialState = {
  locations: [],
  city: '',
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: payload
      }
    case SET_CITY:
      return {
        ...state,
        city: payload
      }

    default:
      return { ...state };
  }
}

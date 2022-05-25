import { GET_LOCATIONS, GET_LOCATION_CARS } from "../actions";

const initialState = {
  locations: [],
  locationCars: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: payload,
      };
    case GET_LOCATION_CARS:
      return {
        ...state,
        locationCars: payload,
      };
    default:
      return { ...state };
  }
}

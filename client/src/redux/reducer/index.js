import { GET_LOCATIONS, GET_LOCATION_CARS, SET_CITY, SEND_MESSAGE } from "../actions";

const initialState = {
  locations: [],
  locationCars: [],
  city: "",
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

    case SET_CITY:
      return {
        ...state,
        city: payload,
      };

    case SEND_MESSAGE:
      return {
        ...state
      }

    default:
      return { ...state };
  }
}

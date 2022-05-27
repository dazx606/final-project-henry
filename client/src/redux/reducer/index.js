import {
  GET_FILTERED_CARS,
  GET_LOCATIONS,
  GET_LOCATION_CARS,
  SET_CITY,
  GET_CAR_DETAILS,
  SEND_MESSAGE,
} from "../actions";

const initialState = {
  locations: [],
  locationCars: {},
  city: "",
  filteredCars: [],
  carDetails: [],
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

    case GET_FILTERED_CARS:
      let array = [];

      for (let i = 0; i < payload.length; i++) {
        let array2 = [...array];
        let duplicate = false;
        for (let j = 0; j < array2.length; j++) {   
          if (payload[i].model === array2[j].model) duplicate = true;
        }
        if (duplicate === false) array.push(payload[i]);
      }
      
      return {
        ...state,
        filteredCars: array,
      };

    case SET_CITY:
      return {
        ...state,
        city: payload,
      };
    case GET_CAR_DETAILS:
      return {
        ...state,
        carDetails: payload,
      };

    case SEND_MESSAGE:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
}

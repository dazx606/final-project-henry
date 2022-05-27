import { GET_FILTERED_CARS, GET_LOCATIONS, GET_LOCATION_CARS, SET_CITY } from "../actions";

const initialState = {
  locations: [],
  locationCars: {},
  city: "",
  filteredCars: [],
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

    default:
      return { ...state };
  }
}

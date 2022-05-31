import {
  GET_FILTERED_CARS,
  GET_LOCATIONS,
  GET_LOCATION_CARS,
  SET_CITY,
  GET_CAR_DETAILS,
  SEND_MESSAGE,
  ALERT,
  SET_SELECTION,
  DELETE_CAR_DETAILS,
  SET_USER,
} from "../actions";

const initialState = {
  locations: [],
  locationCars: {},
  city: "",
  filteredCars: [],
  carDetails: {},
  hideAlert: true,
  selection: {
    brand: "",
    category: "",
    order: "ASC",
    startingDate: "",
    endingDate: "",
    orderType: "pricePerDay",
    page: 1,
  },
  user: {},
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
      //let array = [];
      // for (let i = 0; i < payload.length; i++) {
      //   let array2 = [...array];
      //   let duplicate = false;
      //   for (let j = 0; j < array2.length; j++) {
      //     if (payload[i].model === array2[j].model) duplicate = true;
      //   }
      //   if (duplicate === false) array.push(payload[i]);
      // }
      return {
        ...state,
        filteredCars: payload,
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
    case DELETE_CAR_DETAILS:
      return { ...state, carDetails: payload };

    case SEND_MESSAGE:
      return {
        ...state,
      };

    case ALERT:
      return {
        ...state,
        hideAlert: payload,
      };

    case SET_SELECTION:
      return {
        ...state,
        selection: payload,
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
      };

    default:
      return { ...state };
  }
}

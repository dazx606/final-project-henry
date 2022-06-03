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
  GET_RENTING_CAR,
  DELETE_RENTING_CAR,
  RENT_ID,
  SET_USER,
  SAVE_USER,
  PATCH_USER,
  SET_PROFILE_OPTIONS,
} from "../actions";

const initialState = {
  locations: [],
  locationCars: {},
  city: "",
  filteredCars: [],
  carDetails: {},
  carRenting: {},
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
  rentId: "",
  savedUser: [],
  user: {},
  profileOptions: "information",
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
    case GET_RENTING_CAR:
      return {
        ...state,
        carRenting: payload,
      }
    case DELETE_CAR_DETAILS:
      return {
        ...state,
        carDetails: payload
      };
    case DELETE_RENTING_CAR:
      return {
        ...state,
        carRenting: {}
      }
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
    case RENT_ID:
      return {
        ...state,
        rentId: payload,
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case SAVE_USER:
      return {
        ...state,
        savedUser: payload,
      };
    case PATCH_USER:
      return {
        ...state,
        user: { data: { ...state.user.data, ...payload } },
      };
    case SET_PROFILE_OPTIONS: {
      return {
        ...state,
        profileOptions: payload
      }
    }

    default:
      return { ...state };
  }
}

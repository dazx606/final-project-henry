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
  SET_USER,
  SAVE_USER,
  PATCH_USER,
  GET_ALL_USERS_INFO,
  DELETE_USER_INFO,
  GET_USER_FOR_ADMIN,
  SET_PROFILE_OPTIONS,
  SET_ADMIN_OPTIONS,
  GET_USER_RESERVATIONS,
  GET_ALL_RESERVATIONS,
  DELETE_RESERVATION
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
  savedUser: [],
  user: {},
  userReservations: [],
  token:"",
  users: [],
  userForAdmin:{},
  profileOptions: "information",
  adminOptions: "users",
  allCars:[],
  pagination: {page: 1, pageNum: 1},
  orders: [],
};

export default function rootReducer(state = initialState, { type, payload, token }) {
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
        filteredCars: payload.models,
        pagination: payload.pagination
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
      };
    case DELETE_CAR_DETAILS:
      return {
        ...state,
        carDetails: payload,
      };
    case DELETE_RENTING_CAR:
      return {
        ...state,
        carRenting: {},
      };
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
        token
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
    case GET_ALL_USERS_INFO:
      return {
        ...state,
        users: payload,
      };
    case DELETE_USER_INFO:
      return {
        ...state,
        users: payload,
      };
    case GET_USER_FOR_ADMIN:
      return {
        ...state,
        userForAdmin: payload,
      }
    case SET_PROFILE_OPTIONS: {
      return {
        ...state,
        profileOptions: payload,
      };
    }
    case SET_ADMIN_OPTIONS: {
      return {
        ...state,
        adminOptions: payload,
      };
    }
    case GET_USER_RESERVATIONS: {
      return {
        ...state,
        userReservations: payload
      }
    }
     case GET_ALL_RESERVATIONS:{
       return{
         ...state,
         orders:payload,
       }
     }
     case DELETE_RESERVATION:{
       return{
         ...state,
         orders:payload
       }
     }

    default:
      return { ...state };
  }
}

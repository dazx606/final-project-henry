import {
  GET_FILTERED_CARS,
  GET_LOCATIONS,
  GET_LOCATION_CARS,
  SET_CITY,
  GET_CAR_DETAILS,
  SEND_MESSAGE,
  ALERT,
  SET_CATEGORY,
  SEND_ERROR
} from "../actions";

const initialState = {
  locations: [],
  locationCars: {},
  city: "",
  filteredCars: [],
  carDetails: {},
  hideAlert: true,
  category:"",
  error: "",
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: payload,
        error: '',
      };
    case GET_LOCATION_CARS:
      return {
        ...state,
        locationCars: payload,
        error: '',
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
        error: '',
      };

    case SET_CITY:
      return {
        ...state,
        city: payload,
        error: '',
      };
    case GET_CAR_DETAILS:
      return {
        ...state,
        carDetails: payload,
        error: '',
      };

    case SEND_MESSAGE:
      return {
        ...state,
        error: '',
      };

    case ALERT:
      return{
        ...state,
        hideAlert:payload,
        error: '',
      }
    
    case SET_CATEGORY:
      return{
        ...state,
        category: payload,
        error: '',
      }
      case SEND_ERROR:
        return{
          ...state,
          error: payload,
          filteredCars:[]
        }

    default:
      return { ...state };
  }
}

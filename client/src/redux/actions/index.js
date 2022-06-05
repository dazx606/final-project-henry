// Declarar types aqui. ej export const GET_CARS = "GET_CARS"
import axios from "axios";
import {
  getAllLocations,
  getCarsByLocation,
  filterCars,
  getCarsDetails,
  sendAMessage,
  getUserInformation,
  addUser,
  updateUser,
  getAllUsersInfo,
  deleteUserInfo,
  getUserReservations,
  getAllReservs,
  deleteReserv,
} from "../../services/services";
export const GET_LOCATIONS = "GET_LOCATIONS";
export const GET_LOCATION_CARS = "GET_LOCATION_CARS";
export const SET_CITY = "SET_CITY";
export const GET_FILTERED_CARS = "GET_FILTERED_CARS";
export const GET_CAR_DETAILS = "GET_CAR_DETAILS";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const ALERT = "ALERT";
export const SET_SELECTION = "SET_SELECTION";
export const DELETE_CAR_DETAILS = "DELETE_CAR_DETAILS";
export const GET_RENTING_CAR = "GET_RENTING_CAR";
export const DELETE_RENTING_CAR = "DELETE_RENTING_CAR";
export const RENT_ID = "RENT_ID";
export const SET_USER = "SET_USER";
export const SAVE_USER = "SAVE_USER";
export const PATCH_USER = "UPDATE_USER";
export const GET_ALL_USERS_INFO = "GET_ALL_USERS_INFO";
export const DELETE_USER_INFO = "DELETE_USERS_INFO";
export const SET_PROFILE_OPTIONS = "SET_PROFILE_OPTIONS";
export const SET_ADMIN_OPTIONS = "SET_ADMIN_OPTIONS";
export const GET_USER_FOR_ADMIN = "GET_USER_FOR_ADMIN";
export const GET_USER_RESERVATIONS = "GET_USER_RESERVATIONS";
export const GET_ALL_RESERVATIONS = "GET_ALL_RESERVATIONS";
export const DELETE_RESERVATION = "DELETE_RESERVATION";

export const URL = "http://localhost:3001/";

export function getLocations() {
  return async (dispatch) => {
    try {
      const response = await getAllLocations();
      return dispatch({ type: GET_LOCATIONS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLocationCars(locationId) {
  return async (dispatch) => {
    try {
      const response = await getCarsByLocation(locationId);
      return dispatch({
        type: GET_LOCATION_CARS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRentingCar(carModel) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}car/${carModel}`);
      return dispatch({ type: GET_RENTING_CAR, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getFilteredCars(
  {
    brand = "",
    category = "",
    order = "ASC",
    startingDate = "",
    endingDate = "",
    orderType = "pricePerDay",
    page = 1,
    model = "",
    carsPerPage = 8,
  },
  locationId
) {
  return async (dispatch) => {
    try {
      /////////////FALTA MODULARIZAR EN SERVICES
      var response = await axios.get(
        `${URL}cars/${locationId}?brand=${brand}&category=${category}&order=${order}&orderType=${orderType}&startingDate=${startingDate}&endingDate=${endingDate}&page=${page}&model=${model}&carsPerPage=${carsPerPage}`
      );
      var cars = response.data;

      return dispatch({
        type: GET_FILTERED_CARS,
        payload: cars,
      });
    } catch (error) {
      return dispatch({
        type: GET_FILTERED_CARS,
        payload: {
          pagination: {},
          models:[]
        },
      });
    }
  };
}

export const setCity = (payload) => {
  return {
    type: SET_CITY,
    payload,
  };
};

export const setSelection = (payload) => {
  return {
    type: SET_SELECTION,
    payload,
  };
};

export function getCarDetails(carModel) {
  return async (dispatch) => {
    try {
      const response = await getCarsDetails(carModel);
      return dispatch({ type: GET_CAR_DETAILS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteCarDetails() {
  return {
    type: DELETE_CAR_DETAILS,
    payload: {},
  };
}

export function deleteRentingCar() {
  return { type: DELETE_RENTING_CAR };
}

export function sendMessage(message) {
  return async (dispatch) => {
    try {
      const response = await sendAMessage(message);
      return dispatch({
        type: SEND_MESSAGE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function showAlert(payload) {
  return {
    type: ALERT,
    payload,
  };
}

export function rentCar(location, model, startingDate, endingDate, optionalEquipments, drivers, endLocation, userId) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}rent/car`, {
        location,
        model,
        startingDate,
        endingDate,
        optionalEquipments,
        drivers,
        endLocation,
        userId,
      });
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };
}
// authentication actions:

export function setUserInfo(getToken, email) {
  return async (dispatch) => {
    try {
      if (email) {
        const token = await getToken();
        let response = await getUserInformation(token, email);
        return dispatch({ type: SET_USER, payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function userReservations(token, userId) {
  return async (dispatch) => {
    try {
      if (userId) {
        let response = await getUserReservations(token, userId);
        return dispatch({ type: GET_USER_RESERVATIONS, payload: response.data, token });
      }
    } catch (error) {
      return dispatch({ type: GET_USER_RESERVATIONS, payload: undefined, token })
    }
  }
}

export function saveUser(email, picture) {
  return async (dispatch) => {
    try {
      const response = await addUser(email, picture);
      return dispatch({
        type: SAVE_USER,
        payload: [response.data.msg, response.data.data, response.data.complited],
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function patchUser(getToken, payload) {
  return async (dispatch) => {
    try {
      const token = await getToken();
      await updateUser(payload, token);

      return dispatch({
        type: PATCH_USER,
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getAdminUsers(token, email) {
  return async (dispatch) => {
    try {
      
      let response = await getAllUsersInfo(token, email);
      return dispatch({
        type: GET_ALL_USERS_INFO,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function deleteUser(token, payload) {
  return async (dispatch) => {
    try {
      
      const response = await deleteUserInfo(payload, token);
      
      return dispatch({
        type: DELETE_USER_INFO,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getUserForadmin(getToken, email) {
  return async (dispatch) => {
    try {
      if (email) {
        const token = await getToken();
        let response = await getUserInformation(token, email)
        return dispatch({ type: GET_USER_FOR_ADMIN, payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function setProfileOptions(payload) {
  return {
    type: SET_PROFILE_OPTIONS,
    payload,
  };
}

export function setAdminOptions(payload) {
  return {
    type: SET_ADMIN_OPTIONS,
    payload,
  };
}
export function getAllReservations(getToken) {
  return async (dispatch) => {
    try {
      const token = await getToken();
      let response = await getAllReservs(token);
      return dispatch({
        type: GET_ALL_RESERVATIONS,
        payload: response.data.orders,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function deleteReservation(getToken, payload) {
  return async (dispatch) => {
    try {
      const token = await getToken();
      await deleteReserv(payload, token);
      let response = await getAllReservs(token);
      return dispatch({
        type: DELETE_RESERVATION,
        payload: response.data.orders,
      });
    } catch (error) {
      if(error?.response?.data?.msg==="There are no orders"){
        return dispatch({
          type: DELETE_RESERVATION,
          payload:[],
        });
      }
    }
  };
}

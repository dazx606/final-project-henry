// Declarar types aqui. ej export const GET_CARS = "GET_CARS"
import { getAllLocations, getCarsByLocation, filterCars, getCarsDetails, sendAMessage, getUserInformation, insertUser, setUser } from "../../services/services";
export const GET_LOCATIONS = "GET_LOCATIONS";
export const GET_LOCATION_CARS = "GET_LOCATION_CARS";
export const SET_CITY = "SET_CITY";
export const GET_FILTERED_CARS = "GET_FILTERED_CARS";
export const GET_CAR_DETAILS = "GET_CAR_DETAILS";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const ALERT = "ALERT";
export const SET_SELECTION = "SET_SELECTION";
export const DELETE_CAR_DETAILS = "DELETE_CAR_DETAILS";
export const SET_USER = "SET_USER";
export const SAVE_USER = "SAVE_USER";
export const PATCH_USER = "UPDATE_USER";

const URL = "http://localhost:3001/";

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

export function getFilteredCars({ brand, category, order, startingDate, endingDate, orderType, page }, locationId) {
  return async (dispatch) => {
    try {
      var response = await filterCars({ brand, category, order, startingDate, endingDate, orderType, page }, locationId)
      var cars = response.data;

      return dispatch({
        type: GET_FILTERED_CARS,
        payload: cars,
      });
    } catch (error) {
      return dispatch({
        type: GET_FILTERED_CARS,
        payload: [],
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

// authentication actions:

export function getUserInfo(getToken, email) {
  return async (dispatch) => {
    try {
      if (email) {
        const token = await getToken();
        let response = await getUserInformation(token,email)
        return dispatch({ type: SET_USER, payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function saveUser(email) {
  return async (dispatch) => {
    try {
      const response = await insertUser(email);
      return dispatch({
        type: SAVE_USER,
        payload: [response.data.msg, response.data.data, response.data.complited],
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function patchUser(payload) {
  return async (dispatch) => {
    try {
      await setUser(payload);

      return dispatch({
        type: PATCH_USER,
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

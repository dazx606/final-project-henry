// Declarar types aqui. ej export const GET_CARS = "GET_CARS"
import axios from "axios";
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

const URL = "http://localhost:3001/";

export function getLocations() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}locations`);
      return dispatch({ type: GET_LOCATIONS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLocationCars(locationId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}locationCars/${locationId}`);
      return dispatch({
        type: GET_LOCATION_CARS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getFilteredCars(
  { brand, category, order, startingDate, endingDate, orderType, page },
  locationId
) {
  return async (dispatch) => {
    try {
      var response = await axios.get(
        `${URL}cars/${locationId}?brand=${brand}&category=${category}&order=${order}&orderType=${orderType}&startingDate=${startingDate}&endingDate=${endingDate}&page=${page}`
      );
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
      const response = await axios.get(`${URL}car/${carModel}`);
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

export function sendMessage(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}send-email`, payload);
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
        const options = {
          method: "GET",
          mode: "cors",
          headers: { authorization: `Bearer ${token}` },
        };
        const response = await axios(
          `http://localhost:3001/user?email=${email}`,
          options
        );
        return dispatch({ type: SET_USER, payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function saveUser(email) {
  console.log(email);
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}user`, { email });
      console.log(response.data);
      return dispatch({
        type: SAVE_USER,
        payload: [
          response.data.msg,
          response.data.data,
          response.data.complited,
        ],
      });
    } catch (e) {
      console.log(e);
    }
  };
}

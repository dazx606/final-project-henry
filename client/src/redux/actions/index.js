// Declarar types aqui. ej export const GET_CARS = "GET_CARS"

import axios from "axios";
export const GET_LOCATIONS = "GET_LOCATIONS";
export const GET_LOCATION_CARS = "GET_LOCATION_CARS";
export const SET_CITY = "SET_CITY";
export const GET_FILTERED_CARS = "GET_FILTERED_CARS";
export const GET_CAR_DETAILS = "GET_CAR_DETAILS";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const ALERT = "ALERT";
export const SET_CATEGORY = "SET_CATEGORY";

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

export function getFilteredCars({ brand, carType, order, startingDate, endingDate, orderType, page }, locationId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}cars/${locationId}?brand=${brand}&category=${carType}&order=${order}&orderType=${orderType}&startingDate=${startingDate}&endingDate=${endingDate}&page=${page}`
      );
      const cars = response.data;

      return dispatch({
        type: GET_FILTERED_CARS,
        payload: cars,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const setCity = (payload) => {
  return {
    type: SET_CITY,
    payload,
  };
};

export function getCarDetails(carId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}car/${carId}`);
      return dispatch({ type: GET_CAR_DETAILS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
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

export function setCategory(payload) {
  return {
    type: SET_CATEGORY,
    payload,
  };
}

//Datos hard codeados
import { locationsArray } from "./hardcoded";

// Declarar types aqui. ej export const GET_CARS = "GET_CARS"

import axios from "axios";
export const GET_LOCATIONS = "GET_LOCATIONS";
export const GET_LOCATION_CARS = "GET_LOCATION_CARS";
export const SET_CITY = "SET_CITY";
const URL = "http://localhost:3001/";

export function getLocations() {
  return async (dispatch) => {
    try {
      // ruta del back y logica necesaria
      return dispatch({ type: GET_LOCATIONS, payload: locationsArray });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLocationCars() {
  return async (dispatch) => {
    try {
      // ruta del back y logica necesaria
      return dispatch({ type: GET_LOCATION_CARS, payload: "por hacer" });
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

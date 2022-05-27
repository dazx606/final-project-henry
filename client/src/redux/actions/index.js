// Declarar types aqui. ej export const GET_CARS = "GET_CARS"

import axios from "axios";
export const GET_LOCATIONS = "GET_LOCATIONS";
export const GET_LOCATION_CARS = "GET_LOCATION_CARS";
export const SET_CITY = "SET_CITY";
export const GET_FILTERED_CARS = 'GET_FILTERED_CARS';
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
};

export function getLocationCars(locationId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}locationCars/${locationId}`);
      let brands = response.data.map((car) => car.brand);
      brands = [...new Set(brands)];
      let categories = response.data.map((car) => car.carType.name);
      categories = [...new Set(categories)];
      return dispatch({
        type: GET_LOCATION_CARS,
        payload: { brands: brands, categories: categories },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getFilteredCars({ brand, carType, order, startDate, endDate, orderType, page }, locationId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}cars/${locationId}?brand=${brand}&category=${carType}&order=${order}&orderType=${orderType}&page=${page}`);
      const cars = response.data;
          
      return dispatch({
        type: GET_FILTERED_CARS,
        payload: cars
      })
    }
    catch (error) {
      console.log(error)
    }
  }
}



export const setCity = (payload) => {
  return {
    type: SET_CITY,
    payload,
  };
};

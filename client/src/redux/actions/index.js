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
  getAllIncludedEquipment,
  getAllOptionalEquipment,
  getAllUsersInfo,
  deleteUserInfo,
  getUserReservations,
  getUserReservation,
  getAllReservs,
  deleteReserv,
  getAllCars,
  getAllModels,
  createIndividualCar,
  deleteSpecificCar,
  cancelUserReservation,
  getOrderDetail,
  rateCar,
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
export const GET_OPTIONAL_EQUIPMENT = "GET_OPTIONAL_EQUIPMENT";
export const GET_INCLUDED_EQUIPMENT = "GET_INCLUDED_EQUIPMENT";
export const GET_USER_FOR_ADMIN = "GET_USER_FOR_ADMIN";
export const GET_USER_RESERVATIONS = "GET_USER_RESERVATIONS";
export const GET_ALL_RESERVATIONS = "GET_ALL_RESERVATIONS";
export const DELETE_RESERVATION = "DELETE_RESERVATION";
export const GET_ALL_ADMIN_CARS = "GET_ALL_ADMIN_CARS";
export const GET_ALL_MODELS = "GET_ALL_MODELS";
export const DELETE_CAR = "DELETE_CAR";
export const GET_USER_RESERVATION = "GET_USER_RESERVATION";
export const CANCEL_RESERVATION = "CANCEL_RESERVATION";
export const GET_DETAIL_RESERVATION = "GET_DETAIL_RESERVATION";
export const RATE_CAR = "RATE_CAR";

const  URL  = process.env.REACT_APP_URL;

// export const URL = "https://car-rents.herokuapp.com/";

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
          models: [],
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

// authentication actions:

export function setUserInfo(getToken, email) {
  return async (dispatch) => {
    try {
      if (email) {
        const token = await getToken();
        // console.log(token);
        let response = await getUserInformation(token, email);
        return dispatch({ type: SET_USER, payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function userReservations(getToken, userId) {
  return async (dispatch) => {
    let token = getToken();
    try {
      if (userId) {
        let response = await getUserReservations(token, userId);
        return dispatch({
          type: GET_USER_RESERVATIONS,
          payload: response.data,
        });
      }
    } catch (error) {
      return dispatch({ type: GET_USER_RESERVATIONS, payload: undefined });
    }
  };
}

export function userReservation(getToken, orderId) {
  return async (dispatch) => {
    let token = getToken();
    try {
      if (orderId) {
        let response = await getUserReservation(token, orderId);
        return dispatch({
          type: GET_USER_RESERVATION,
          payload: response.data,
        });
      }
    } catch (error) {
      return dispatch({ type: GET_USER_RESERVATION, payload: undefined });
    }
  };
}

export function cancelReservation(getToken, userId, rentId) {
  return async (dispatch) => {
    let token = getToken();
    try {
      if (userId && rentId) {
        let response = await cancelUserReservation(token, userId, rentId);
        return dispatch({
          type: CANCEL_RESERVATION,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
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
}

export function getUserForadmin(getToken, email) {
  return async (dispatch) => {
    try {
      if (email) {
        const token = await getToken();
        let response = await getUserInformation(token, email);
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

export function getAllReservations(getToken, id) {
  return async (dispatch) => {
    try {
      const token = await getToken();
      let response = await getAllReservs(token, id);
      return dispatch({
        type: GET_ALL_RESERVATIONS,
        payload: response.data.order
          ? [response.data.order]
          : response.data.orders,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: GET_ALL_RESERVATIONS,
        payload: [],
      });
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
      if (error?.response?.data?.msg === "There are no orders") {
        return dispatch({
          type: DELETE_RESERVATION,
          payload: [],
        });
      }
    }
  };
}

export function getAllAdminCars(getToken, plate, page) {
  return async (dispatch) => {
    try {
      const token = await getToken();
      let response = await getAllCars(token, plate, page);
      return dispatch({
        type: GET_ALL_ADMIN_CARS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteCar(getToken, plate) {
  return async (dispatch) => {
    try {
      const token = getToken();
      let response = await deleteSpecificCar(token, plate);

      return dispatch({
        type: DELETE_CAR,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getIncludedEquipment() {
  return async (dispatch) => {
    try {
      const response = await getAllIncludedEquipment();
      return dispatch({
        type: GET_INCLUDED_EQUIPMENT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOptionalEquipment() {
  return async (dispatch) => {
    try {
      const response = await getAllOptionalEquipment();
      return dispatch({
        type: GET_OPTIONAL_EQUIPMENT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getModels() {
  return async (dispatch) => {
    try {
      const response = await getAllModels();
      return dispatch({
        type: GET_ALL_MODELS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function getOrderReservationId(orderId, getToken) {
  return async (dispatch) => {
    try {
      const token = await getToken();
      let response = await getOrderDetail(orderId, token);
      return dispatch({
        type: GET_DETAIL_RESERVATION,
        payload: response.data.order,
      });
    } catch (error) {
      return dispatch({
        type: GET_DETAIL_RESERVATION,
        payload: { error: error.response?.data.msg },
      });
    }
  };
}

export function sendCarRating (getToken, userId, ratings) {
  return async (dispatch) => {
    try {
      const token = await getToken();
      let response = await rateCar(token, userId, ratings)
      return dispatch ({
        type: RATE_CAR,    
        payload: ratings.rate    
      })
    }catch (e) {
      console.log(e)
    }
  }
}

import axios from "axios";
const URL = "https://car-rents.herokuapp.com/";

export function getAllLocations() {
  return axios.get(`${URL}locations`);
}

export function getCarsByLocation(locationId) {
  return axios.get(`${URL}locationCars/${locationId}`);
}

export function filterCars(
  { brand, category, order, startingDate, endingDate, orderType, page },
  locationId
) {
  return axios.get(
    `${URL}cars/${locationId}?brand=${brand}&category=${category}&order=${order}&orderType=${orderType}&startingDate=${startingDate}&endingDate=${endingDate}&page=${page}`
  );
}

export function getCarsDetails(carModel) {
  return axios.get(`${URL}car/${carModel}`);
}

export function sendAMessage(message) {
  return axios.post(`${URL}send-email`, message);
}

export function getUserInformation(token, email) {
  const options = {
    method: "GET",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios(`${URL}user?email=${email}`, options);
}

export function getUserReservations(token, userId) {
  const options = {
    method: "GET",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios(`${URL}user/reservations?userId=${userId}`, options);
}

export function getUserReservation(token, orderId) {
  const options = {
    method: "GET",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios(`${URL}user/reservation/${orderId}`, options);
}

export function cancelUserReservation(token, userId, rentId) {
  const options = {
    method: "DELETE",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.delete(`${URL}rent/refund/${userId}/${rentId}`, options);
}

export function addUser(email, picture) {
  return axios.post(`${URL}user`, { email, picture });
}

export function updateUser(user, token) {
  // console.log("service token: "+token);
  const options = {
    method: "PATCH",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.patch(`${URL}user/${user.userId}`, user, options);
}
export function getAllUsersInfo(token, email) {
  const options = {
    method: "GET",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.get(`${URL}admin/users?email=${email}`, options);
}

export function deleteUserInfo(userId, token) {
  const options = {
    method: "DELETE",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.delete(`${URL}admin/users/${userId}`, options);
}

export function getAllReservs(token, orderId) {
  const options = {
    method: "GET",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
    params: { orderId },
  };
  return axios.get(`${URL}admin/reservations`, options);
}

export function deleteReserv(reservId, token) {
  const options = {
    method: "DELETE",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.delete(
    `${URL}admin/reservations/delete/${reservId}`,
    options
  );
}

export function getAllOptionalEquipment() {
  return axios.get(`${URL}admin/equipment/optional`);
}

export function getAllIncludedEquipment() {
  return axios.get(`${URL}admin/equipment/included`);
}

export function getAllCars(token, plate, page) {
  const options = {
    method: "GET",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.get(
    `${URL}admin/allCars?plate=${plate}&&page=${page}`,
    options
  );
}

export function getAllModels() {
  return axios.get(`${URL}models`);
}

export async function createIndividualCar(body, getToken) {
  const token = await getToken();
  const options = {
    method: "post",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  const respone = await axios.post(`${URL}admin/car`, body, options);
  return respone.data;
}

export async function createModel(body, getToken) {
  const token = await getToken();
  const options = {
    method: "post",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${URL}admin/model`, body, options);
  return response.data;
}

export function deleteSpecificCar(token, plate) {
  const options = {
    mothod: "DELETE",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.delete(
    `${URL}admin//cars/delete/${plate}`,
    options
  );
}

export function rentCar(
  location,
  model,
  startingDate,
  endingDate,
  optionalEquipments,
  drivers,
  endLocation,
  userId,
  getToken
) {
  return async () => {
    try {
      const token = await getToken();
      const options = {
        method: "POST",
        mode: "cors",
        headers: { authorization: `Bearer ${token}` },
      };
      const res = await axios.post(
        `${URL}rent/car`,
        {
          location,
          model,
          startingDate,
          endingDate,
          optionalEquipments,
          drivers,
          endLocation,
          userId,
        },
        options
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrderDetail(orderId, token) {
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: { authorization: `Bearer ${token}` }
  }
  return axios.get(`${URL}admin/reservation/${orderId}`, options)
}

export function modifyReservation(
  startingDate,
  endingDate,
  userId,
  rentId,
  getToken
) {
  return async () => {
    try {
      const token = await getToken();
      const options = {
        method: "PATCH",
        mode: "cors",
        headers: { authorization: `Bearer ${token}` },
      };
      const res = await axios.patch(
        `${URL}rent/modify`,
        {
          startingDate,
          endingDate,
          userId,
          rentId
        },
        options
      );
      if(res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// export function modifyBooking(token, body) {
//   const options = {
//     method: "PATCH",
//     mode: "cors",
//     headers: { authorization: `Bearer ${token}` },
//   };
//   return axios.patch(`${URL}rent/modify`,body, options);
// }
export function rateCar(token, userId, ratings) {
  const options = {
    method: 'PATCH',
    mode: 'cors',
    headers: {authorization:  `Bearer ${token}`}
  };
  return axios.patch(`http://localhost:3001/user/rate`, {userId, ratings}, options)
}

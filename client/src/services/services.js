import axios from "axios";
const URL = "http://localhost:3001/";

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
  return axios(`http://localhost:3001/user?email=${email}`, options);
}

export function getUserReservations(token, userId) {
  const options = {
    method: "GET",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios(`${URL}user/reservations?userId=${userId}`, options);
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
  return axios.get(`http://localhost:3001/admin/users?email=${email}`, options);
}

export function deleteUserInfo(userId, token) {
  const options = {
    method: "DELETE",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.delete(`http://localhost:3001/admin/users/${userId}`, options);
}

export function getAllReservs(token, orderId) {
  const options = {
    method: "GET",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
    params: { orderId }
  };
  return axios.get(`http://localhost:3001/admin/reservations`, options);
}

export function deleteReserv(reservId, token) {
  const options = {
    method: "DELETE",
    mode: "cors",
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.delete(
    `http://localhost:3001/admin/reservations/delete/${reservId}`,
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
  return axios.get(`http://localhost:3001/admin/allCars?plate=${plate}&&page=${page}`, options)
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
  getToken,
) {
  return async () => {
    try {
      const token = await getToken();
      const options = {
        method: "POST",
        mode: "cors",
        headers: { authorization: `Bearer ${token}` },
      };
      const res = await axios.post(`${URL}rent/car`, {
        location,
        model,
        startingDate,
        endingDate,
        optionalEquipments,
        drivers,
        endLocation,
        userId,
      }, options);
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };
}
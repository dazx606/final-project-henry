import axios from "axios";
const URL = "http://localhost:3001/";


export function getAllLocations() {
    return axios.get(`${URL}locations`)
};

export function getCarsByLocation (locationId){
    return axios.get(`${URL}locationCars/${locationId}`);
};

export function filterCars ({ brand, category, order, startingDate, endingDate, orderType, page }, locationId){
    return axios.get(
        `${URL}cars/${locationId}?brand=${brand}&category=${category}&order=${order}&orderType=${orderType}&startingDate=${startingDate}&endingDate=${endingDate}&page=${page}`
      );
};

export function getCarsDetails(carModel){
    return axios.get(`${URL}car/${carModel}`);
};

export function sendAMessage(message){
    return axios.post(`${URL}send-email`, message)
};

export function getUserInformation(token, email){
    const options = {
        method: "GET",
        mode: "cors",
        headers: { authorization: `Bearer ${token}` },
      };
      return axios(
        `http://localhost:3001/user?email=${email}`,
        options
      );
};

export function insertUser(email){
    return axios.post(`${URL}user`, { email });
};

export function setUser(user){
    return axios.patch(`${URL}user/${user.userId}`, user);
}
// Declarar types aqui. ej export const GET_CARS = "GET_CARS"
import axios from 'axios';
export const GET_LOCATIONS = 'GET_LOCATION';
export const SET_CITY = 'SET_CITY';


const URL_LOCAL = 'http://localhost:3001';

export const getLocations = () => {
    const data = [
        {   id:1,
            city: 'Buenos Aires',
            lat: 0,
            long: 0
        },
        {
            id:2,
            city: 'Posadas',
            lat: 0,
            long: 0
        },
        {
            id:3,
            city: 'Bogotá',
            lat: 0,
            long: 0
        },
        {
            id:4,
            city: 'Medellin',
            lat: 0,
            long: 0
        },
        {
            id:5,
            city: 'Ciudad de Mexico',
            lat: 0,
            long: 0
        },
        {
            id:6,
            city: 'Santiago de Chile',
            lat: 0,
            long: 0
        }
    ]
    try {
        return ({
            type: GET_LOCATIONS,
            payload: data
        })

    } catch (e) {
        console.log(e)
    }
}

export const setCity = (payload) => {
    return {
        type: SET_CITY,
        payload
    }
}



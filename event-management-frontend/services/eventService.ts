import axios from 'axios';
import { Event } from '../types/Event';

const API_URL = 'https://dummyjson.com/c/4e75-a7f2-412d-806e';

const getEvents = async (params = {} ) => {
    console.log(params,'params');
    let URL = `${API_URL}/events?${new URLSearchParams(params).toString()}`;

    let response = await axios.get(`${URL}`);
    let arrData = []
    if (response && response.status === 200 && response.data) {
        arrData = response.data;
    }
    return arrData;
};

const createEvent = (event: Event) => {
    return axios.post(`${API_URL}/events`, event, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const updateEvent = (id: string, event: Event) => {
    return axios.put(`${API_URL}/events/${id}`, event);
};

const deleteEvent = (id: string) => {
    return axios.delete(`${API_URL}/events/${id}`);
};

export default {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};

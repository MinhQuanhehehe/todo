import axios from 'axios';

const API = 'http://localhost:3002/tasks';
export const GET = () => axios.get(API);
export const POST = (task) => axios.post(API, task);
export const PATCH = (id, updatedFields) => axios.patch(`${API}/${id}`, updatedFields);
export const DELETE = (id) => axios.delete(`${API}/${id}`);

const USER_API = 'https://reqres.in/api';

export const loginApi = (email, password) =>
    axios.post(`${USER_API}/login`, { email, password }, {
        headers: { 'x-api-key': 'reqres-free-v1' }
    });

export const registerApi = (email, password) =>
    axios.post(`${USER_API}/register`, { email, password }, {
        headers: { 'x-api-key': 'reqres-free-v1' }
    });
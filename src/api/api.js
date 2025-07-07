import axios from 'axios';

const API = 'https://db-4m61.onrender.com/users';
export const GET = () => axios.get(API);
export const GET_USER = (id) => axios.get(`${API}/${id}`);
export const POST = (user) => axios.post(API, user);
export const PATCH = (id, updatedFields) => axios.patch(`${API}/${id}`, updatedFields);
export const DELETE = (id) => axios.delete(`${API}/${id}`);

// const USER_API = 'https://reqres.in/api';

// export const loginApi = (email, password) =>
//     axios.post(`${USER_API}/login`, { email, password }, {
//         headers: { 'x-api-key': 'reqres-free-v1' }
//     });

// export const registerApi = (email, password) =>
//     axios.post(`${USER_API}/register`, { email, password }, {
//         headers: { 'x-api-key': 'reqres-free-v1' }
//     });
import axios from 'axios';

const API = 'http://localhost:3001/tasks';
export const GET = () => axios.get(API);
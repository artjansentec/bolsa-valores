import axios from 'axios';

const header = { Pragma: 'no-cache', 'Content-Type': 'application/json' };

export const useApi = axios.create({
    headers: header,
    baseURL: 'http://localhost:3000/'
})
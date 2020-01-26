import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.20.0.3:8080/api/produto/',
});

export default api;

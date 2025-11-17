import axios from 'axios';

const api = axios.create({
    baseURL: 'https://guarded-shelf-40573-5295222ff305.herokuapp.com', // URL do SEU back-end
});

export default api;
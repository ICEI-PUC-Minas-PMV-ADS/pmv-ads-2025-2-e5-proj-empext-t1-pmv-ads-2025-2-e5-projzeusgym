import axios from 'axios';

const api = axios.create({
    baseURL: 'https://teste-zeusgym-50b8de268016.herokuapp.com', // URL DO BANCO KIMURA
 });

export default api;
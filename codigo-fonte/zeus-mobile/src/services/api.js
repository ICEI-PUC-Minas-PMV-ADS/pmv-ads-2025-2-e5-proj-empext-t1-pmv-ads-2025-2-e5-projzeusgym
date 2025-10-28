import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_API_BASE_URL } from '@env'; 

// =========================================================================
// ATENÇÃO: Configuração do BASE_URL
// =========================================================================
// 1. Verifique o IP da sua máquina na sua rede local (ex: 192.168.1.10)
// 2. Verifique a porta em que seu backend 'codigo-fonte' está rodando (ex: 3000)
// 3. Substitua o valor abaixo. Não use 'localhost' ou '127.0.0.1' no app mobile!

const BASE_URL = EXPO_PUBLIC_API_BASE_URL; 

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    // Busca o token salvo no armazenamento local
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      // Adiciona o cabeçalho de Autorização (Bearer Token)
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // 1. Limpa o token expirado do storage
      AsyncStorage.removeItem('userToken');
      
      // 2. Opcional: Aqui você faria a navegação para a tela de Login
      // Como não temos a navegação configurada, apenas registramos no console.
      console.log('Token expirado (401). Removido do storage.');
      console.log('!!! Necessário redirecionar o usuário para a tela de Login.');
    }

    return Promise.reject(error);
  }
);


export default api;

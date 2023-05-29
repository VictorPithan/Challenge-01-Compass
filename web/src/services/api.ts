import axios from 'axios';

// Crie uma instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1', // Coloque a URL base da sua API
  // withCredentials: true
});

// Adicione um interceptor para todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@PithanAnimeSocialMidia:authToken'); // Obtenha o token JWT do armazenamento local (localStorage)

  // Verifique se o token existe e, em seguida, adicione-o ao cabeçalho Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Redirecionar o usuário para a página de login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;

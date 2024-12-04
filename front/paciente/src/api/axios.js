// src/utils/axiosConfig.js

import axios from "axios";

// Configuração do axios com a URL do servidor local
const api = axios.create({
	baseURL: "http://localhost:3000", // URL do servidor rodando no localhost
	timeout: 5000, // Tempo de espera de 5 segundos
});

export default api;

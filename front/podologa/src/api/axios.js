import axios from "axios";
import { parseCookies } from "nookies";
import { signOut } from "../context/AuthContext";

export function configurarClienteAPI(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3000", // Ajuste para sua URL de backend
    headers: {
      Authorization: cookies["@podologia.token"]
        ? `Bearer ${cookies["@podologia.token"]}`
        : undefined,
    },
  });

  // Interceptor para tratar erros 401
  api.interceptors.response.use(
    (response) => response, // Retorna a resposta diretamente
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          signOut(); // Chama o signOut caso o token esteja inválido
        } else {
          return Promise.reject(new Error("AuthTokenError"));
        }
      }
      return Promise.reject(error);
    }
  );

  return api; // Retorna a instância do Axios configurada
}

// Exporta uma instância padrão global (já configurada)
const api = configurarClienteAPI();
export default api;

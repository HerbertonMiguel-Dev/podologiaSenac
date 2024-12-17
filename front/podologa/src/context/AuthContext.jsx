import api from "../api/axios"; // Importe a instância do Axios
import React, { createContext, useState, useContext } from "react";

// Contexto do Auth
const AuthContext = createContext();

// Provider do AuthContext
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null); // Adicionando estado para o token

  // Função para cadastrar um novo usuário
  const signUp = async (nome, email, senha) => {
    try {
      const response = await api.post("/create/usuarios", { nome, email, senha });
      const newUsuario = response.data;
      setUsuario(newUsuario); // Atualiza o usuário no estado
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw new Error(error.response?.data?.message || "Erro ao criar usuário");
    }
  };

  // Função para login de usuário (signIn)
  const signIn = async (email, senha) => {
    try {
      const response = await api.post("/auth/login  ", { email, senha });
      const { token, ...usuarioData } = response.data;
      setUsuario(usuarioData); // Atualiza o usuário no estado
      setToken(token); // Armazena o token no estado

      // Salvar o token no localStorage ou cookies, se necessário
      localStorage.setItem('authToken', token); 

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, token, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

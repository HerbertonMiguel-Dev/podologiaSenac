import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Importe a instância do Axios
import { destroyCookie, setCookie, parseCookies } from "nookies";

// Contexto do Auth
const AuthContext = createContext();

export function signOut() {
  try {
    destroyCookie(null, "@podologia.token", { path: "/" });
    const navigate = useNavigate(); // Use o hook de navegação
    navigate("/"); // Redirecione o usuário para a tela de login
  } catch (err) {
    console.error("Erro ao sair:", err);
  }
}

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate(); // Substituição do Router.push
  const estaAutenticado = !!usuario;

  // useEffect(() => {
  //   const { "@podologia.token": token } = parseCookies();

  //   if (token) {
  //     api
  //       .get("/me", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         const { id, nome, email, endereco, assinaturas } = response.data;
  //         setUsuario({ id, nome, email, endereco, assinaturas });
  //       })
  //       .catch(() => {
  //         logoutUsuario();
  //       });
  //   }
  // }, []);

  // Função para login (signIn)
  const signIn = async (email, senha) => {
    try {
      const response = await api.post("/auth/login", { email, senha });
      const { token, ...usuarioData } = response.data;

      setUsuario(usuarioData); // Atualiza o usuário no estado
      setCookie(undefined, "@podologia.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 1 mês
        path: "/",
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/agendamentos"); // Navegação com React Router DOM
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
  };

  // Função para cadastro (signUp)
  const signUp = async (nome, email, senha) => {
    try {
      await api.post("/create/usuarios", { nome, email, senha });

      setTimeout(() => {
        
        navigate("/"); // Redireciona para a página de login após 3 segundos
      }, 3000);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw new Error(error.response?.data?.message || "Erro ao criar usuário");
    }
  };

  // Função para logout
  const logoutUsuario = () => {
    try {
      destroyCookie(null, "@podologia.token", { path: "/" });
      setUsuario(null);
      navigate("/"); // Navegação com React Router DOM
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, estaAutenticado, signIn, signUp, logoutUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

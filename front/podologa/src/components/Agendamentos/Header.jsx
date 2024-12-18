// Header.jsx
import { Stethoscope } from "lucide-react"; // Substitua por 'Stethoscope' ou outro ícone que faça sentido, se necessário.
import React from "react";
import Logo from "../Login/Logo";
import { useAuth } from "../../../src/context/AuthContext"; // Importando o AuthContext

export const Header = () => { // Exportação como componente nomeado
  const { logoutUsuario  } = useAuth(); // Obtenha o método logout do contexto Auth

  const processarLogout = () => {
    logoutUsuario(); // Chame a função de logout
  };

  return (
    <div className="flex items-center mb-8 justify-between flex-wrap gap-2">
      <Logo className="mx-0" />
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-semibold text-blue-800 flex items-center gap-2">
          <Stethoscope className="w-8 h-8 text-blue-800" />
          Área do podólogo
        </h1>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded-lg"
          onClick={processarLogout}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

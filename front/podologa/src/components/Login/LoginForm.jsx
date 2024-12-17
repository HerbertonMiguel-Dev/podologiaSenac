import React, { useState } from "react";
import { useAuth } from "../../../src/context/AuthContext"; // Importando o AuthContext
import { useNavigate } from "react-router-dom"; // Importando o useNavigate

const LoginForm = () => {
  const { signIn } = useAuth(); // Obtendo a função signIn
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, senha);  // Chamando a função signIn do contexto
      navigate("/agendamentos"); // Redireciona para a página de agendamentos após o login
    } catch (error) {
      setErro(error.message); // Exibe a mensagem de erro
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {erro && <p className="text-red-500">{erro}</p>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Informe seu email *"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha *"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md py-3 text-lg uppercase tracking-wide transition-colors"
      >
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;

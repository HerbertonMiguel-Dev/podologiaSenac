import React from "react";
import { Link } from "react-router-dom";

const CadastroLink = () => (
  <Link
    to="/Cadastro"  // Usando o Link do React Router
    className="block text-blue-600 text-sm hover:underline mt-4 text-center"
  >
    Ainda não possui conta? <strong> Cadastre-se</strong>
  </Link>
);

export default CadastroLink;

// src/pages/index.jsx

import React from "react";
import Logo from "../../components/Login/Logo";
import LoginTitle from "../../components/Login/LoginTitle";
import LoginDescription from "../../components/Login/LoginDescription";
import LoginForm from "../../components/Login/LoginForm";
import CadastroLink from "../../components/Cadastro/CadastroLink";
import ForgotPasswordLink from "../../components/Login/ForgotPasswordLink";
import canSSRGuest from '../../utils/canSSRGuest'; // Importando diretamente a função

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <Logo className="mx-auto" />
      <LoginTitle />
      <LoginDescription />
      <LoginForm />
      <CadastroLink />
      <ForgotPasswordLink />
    </div>
  </div>
);

export const getServerSideProps = async (ctx) => {
  const redirect = canSSRGuest(ctx);

  if (redirect) {
    return redirect;
  }

  return {
    props: {},
  };
};

export default Login;

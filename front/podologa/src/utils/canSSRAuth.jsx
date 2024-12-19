import React, { useEffect } from "react";
import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";

export const canSSRAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const { "@podologia.token": token } = parseCookies();

      if (!token) {
        // Redireciona para a página de login
        navigate("/");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

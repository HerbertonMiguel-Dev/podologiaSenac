import React from "react";
import Logo from "../../components/Login/Logo";
import LoginTitle from "../../components/Login/LoginTitle";
import LoginDescription from "../../components/Login/LoginDescription";
import LoginForm from "../../components/Login/LoginForm";
import ForgotPasswordLink from "../../components/Login/ForgotPasswordLink";

const Login = () => (
	<div className="min-h-screen flex items-center justify-center bg-gray-50">
		<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
			<Logo className="mx-auto"/>
			<LoginTitle />
			<LoginDescription />
			<LoginForm />
			<ForgotPasswordLink />
		</div>
	</div>
);

export default Login;

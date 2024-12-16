import React from "react";

const LoginForm = () => (
	<form className="w-full space-y-6">
		<div className="space-y-4">
			<input
				type="text"
				placeholder="Informe o seu usuário *"
				className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
			<input
				type="password"
				placeholder="Senha *"
				className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default LoginForm;

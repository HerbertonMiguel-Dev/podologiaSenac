import React from "react";

const ForgotPasswordLink = () => (
	<a
		// biome-ignore lint/a11y/useValidAnchor: <explanation>
		href="#"
		className="block text-blue-600 text-sm hover:underline mt-4 text-center"
	>
		Esqueceu o usuário ou senha?
	</a>
);

export default ForgotPasswordLink;

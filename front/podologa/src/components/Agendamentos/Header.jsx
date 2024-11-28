import { Stethoscope } from "lucide-react"; // Substitua por 'Stethoscope' ou outro ícone que faça sentido, se necessário.
import React from "react";
import Logo from "../Login/Logo";

export const Header = () => {
	return (
		<div className="flex items-center mb-8 justify-between flex-wrap gap-4">
			<Logo className="mx-0" />
			<h1 className="text-3xl font-semibold text-blue-800 flex items-center gap-2">
				<Stethoscope className="w-8 h-8 text-blue-800" />
				Área do podólogo
			</h1>
		</div>
	);
};

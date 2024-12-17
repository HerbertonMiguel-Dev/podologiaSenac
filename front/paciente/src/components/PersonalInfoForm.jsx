import React from "react";

const PersonalInfoForm = ({ formData, onUpdateForm }) => (
	<div className="space-y-4">
		<div>
			<h3 className="text-lg font-semibold text-gray-800 mb-6">
				Dados pessoais
			</h3>
			<input
				type="text"
				placeholder="Nome completo"
				className="w-full px-3 py-2 border border-gray-300 rounded-md"
				value={formData.name}
				onChange={(e) => onUpdateForm("name", e.target.value)}
			/>
		</div>
		<input
			type="number"
			placeholder="digite sua idade"
			className="w-full px-3 py-2 border border-gray-300 rounded-md"
			value={formData.idade}
			onChange={(e) => onUpdateForm("idade", e.target.value)}
		/>
		<input
			type="email"
			placeholder="E-mail"
			className="w-full px-3 py-2 border border-gray-300 rounded-md"
			value={formData.email}
			onChange={(e) => onUpdateForm("email", e.target.value)}
		/>
		<input
			type="tel"
			placeholder="Telefone"
			className="w-full px-3 py-2 border border-gray-300 rounded-md"
			value={formData.phone}
			onChange={(e) => onUpdateForm("phone", e.target.value)}
		/>
		<input
			type="text"
			placeholder="CPF"
			className="w-full px-3 py-2 border border-gray-300 rounded-md"
			value={formData.cpf}
			onChange={(e) => onUpdateForm("cpf", e.target.value)}
		/>
	</div>
);

export default PersonalInfoForm;

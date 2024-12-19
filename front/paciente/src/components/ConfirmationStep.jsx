import dayjs from "dayjs";
import React from "react";
import mapa from "../assets/mapa.svg";
import "dayjs/locale/pt-br"; // Importa o locale português
import localizedFormat from "dayjs/plugin/localizedFormat";

// Configura o dayjs
dayjs.extend(localizedFormat);
dayjs.locale("pt-br");

const ConfirmationStep = ({ formData, onConfirm }) => {
	// Verifica se formData.date existe e é válido antes de formatá-la
	const formattedDate = formData.date
		? dayjs(formData.date).isValid()
			? dayjs(formData.date)
				.format("dddd, D [de] MMMM [de] YYYY")
				.replace(/^\w/, (c) => c.toUpperCase()) // Primeira letra maiúscula
			: "Data inválida"
		: "Nenhuma data selecionada";

	return (
		<div className="grid grid-cols-[2fr,1.5fr] gap-4">
			<div>
				<h3 className="font-medium text-gray-800 mb-2">Nome</h3>
				<p className="text-sm text-gray-600">
					{formData.name || "Não informado"}
				</p>

				<h3 className="font-medium text-gray-800 mb-2">Idade</h3>
				<p className="text-sm text-gray-600">
					{formData.idade || "Não informado"} anos
				</p>

				<h3 className="font-medium text-gray-800 mt-4 mb-2">CPF</h3>
				<p className="text-sm text-gray-600">
					{formData.cpf || "Não informado"}
				</p>

				<h3 className="font-medium text-gray-800 mt-4 mb-2">E-mail</h3>
				<p className="text-sm text-gray-600">
					{formData.email || "Não informado"}
				</p>

				<h3 className="font-medium text-gray-800 mt-4 mb-2">Telefone</h3>
				<p className="text-sm text-gray-600">
					{formData.phone || "Não informado"}
				</p>

				<h3 className="font-medium text-gray-800 mt-4 mb-2">
					Horário de atendimento
				</h3>
				<p className="text-sm text-gray-600">
					a partir das 18:00 horas - Por ordem de chegada
				</p>

				<h3 className="font-medium text-gray-800 mt-4 mb-2">
					Local de atendimento
				</h3>
				<p className="text-sm text-gray-600">R. São Tomé, 444 - Cidade Alta</p>

				<h3 className="font-medium text-gray-800 mt-4 mb-2">
					Data do agendamento
				</h3>
				<p className="text-sm text-gray-600">{formattedDate}</p>
			</div>

			<div className="w-full h-full min-h-[400px]">
				<img
					src={mapa}
					alt="Mapa com localização"
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>

			<div className="mt-6">
				<button
					type="button"
					onClick={onConfirm} // Chama a função para confirmar
					className="bg-orange-500 text-white px-6 py-2 rounded-md"
				>
					Confirmar
				</button>
			</div>
		</div>
	);
};

export default ConfirmationStep;

import { X } from "lucide-react";
import React from "react";
import { HealthItem } from "./HealthItem";

export const PatientModal = ({ isOpen, onClose, patient }) => {
	if (!isOpen || !patient) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
				{/* Header com título e botão fechar */}
				<div className="flex justify-between items-center border-b pb-4 mb-6">
					<h2 className="text-xl font-bold text-blue-900">Ficha do paciente</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={24} />
					</button>
				</div>

				{/* Informações do paciente */}
				<div className="space-y-4 mb-8">
					<div>
						<span className="block text-sm font-medium text-gray-600">
							Nome
						</span>
						<p className="text-gray-900">{patient.nome}</p>
					</div>

					<div>
						<span className="block text-sm font-medium text-gray-600">CPF</span>
						<p className="text-gray-900">{patient.cpf}</p>
					</div>

					<div>
						<span className="block text-sm font-medium text-gray-600">
							E-mail
						</span>
						<p className="text-gray-900">{patient.email}</p>
					</div>

					<div>
						<span className="block text-sm font-medium text-gray-600">
							Telefone
						</span>
						<p className="text-gray-900">{patient.telefone}</p>
					</div>
				</div>

				{/* Avaliação de saúde */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Avaliação de saúde
					</h3>
					<div>
						<HealthItem label="Diabetes" value={patient.health?.diabetes} />
						<HealthItem
							label="Hipertensão"
							value={patient.health?.hypertension}
						/>
						<HealthItem
							label="Cardiopatia"
							value={patient.health?.cardiopathy}
						/>
						<HealthItem label="Marcapasso" value={patient.health?.marcapasso} />
						<HealthItem label="Gestante" value={patient.health?.pregnant} />
					</div>
				</div>

				{/* Botões de ação */}
				<div className="flex gap-4 mt-8">
					<button
						type="button"
						className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
					>
						CONCLUIR ATENDIMENTO
					</button>
					<button
						type="button"
						className="flex-1 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors"
					>
						AGENDAR RETORNO
					</button>
				</div>
			</div>
		</div>
	);
};

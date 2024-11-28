import { Heart, Mail, Phone, User, Users, X } from "lucide-react";
import React from "react";

export const ListaAgendamentos = ({
	selectedDate,
	agendamentos,
	totalVagas,
	formatarData,
	onRemoveAgendamento,
}) => {
	const vagasDisponiveis = totalVagas - agendamentos.length;

	return (
		<div className="bg-white rounded-lg shadow p-4">
			<div className="flex flex-wrap items-center justify-between mb-4">
				<h2 className="text-lg font-semibold">
					Agendamentos para {formatarData(selectedDate)}
				</h2>
				<div className="flex flex-wrap items-center gap-2 my-3">
					<span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
						<Users className="w-4 h-4" />
						{totalVagas} vagas liberadas
					</span>
					<span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
						{agendamentos.length} agendados
					</span>
					<span
						className={`px-3 py-1 rounded-full text-sm ${
							vagasDisponiveis > 0
								? "bg-green-100 text-green-600"
								: "bg-red-100 text-red-600"
						}`}
					>
						{vagasDisponiveis} disponíveis
					</span>
				</div>
			</div>

			<div className="space-y-4">
				{agendamentos.length > 0 ? (
					agendamentos.map((agendamento) => (
						<div
							key={agendamento.id}
							className="border rounded-lg p-4 hover:border-purple-200 transition-colors relative"
						>
							<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
								<div className="flex items-center gap-2 flex-grow">
									<User className="w-4 h-4 text-gray-500" />
									<span className="font-medium">{agendamento.nome}</span>
									{(agendamento.status === "CONFIRMADO" ||
										agendamento.status === "PENDENTE") && (
										<button
											type="button"
											onClick={() => onRemoveAgendamento(agendamento.id)}
											className="p-1 rounded-full hover:bg-red-50 transition-colors group"
											aria-label="Remover agendamento"
										>
											<X className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
										</button>
									)} 	
								</div>
								<div className="flex items-center gap-2 flex-shrink-0">
									<span
										className={`text-sm px-2 py-1 rounded-full ${
											agendamento.status === "CONFIRMADO"
												? "bg-green-100 text-green-700"
												: agendamento.status === "PENDENTE"
													? "bg-yellow-100 text-yellow-700"
													: "bg-gray-100 text-gray-700"
										}`}
									>
										{agendamento.status}
									</span>
									
								</div>
							</div>

							{agendamento.cpf && (
								<div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
									<span className="font-medium">CPF:</span>
									<span>{agendamento.cpf}</span>
								</div>
							)}

							{agendamento.telefone && (
								<div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
									<Phone className="w-4 h-4" />
									<span>{agendamento.telefone}</span>
								</div>
							)}

							{agendamento.email && (
								<div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
									<Mail className="w-4 h-4" />
									<span>{agendamento.email}</span>
								</div>
							)}

							{agendamento.health && (
								<div className="flex items-center gap-2 mt-2">
									<Heart className="w-4 h-4 text-red-500" />
									<div className="flex flex-wrap gap-1">
										{Object.values(agendamento.health).every(
											(value) => !value,
										) ? (
											<span className="text-gray-500 text-sm">
												Paciente sem condições de risco à saúde
											</span>
										) : (
											Object.entries(agendamento.health)
												.filter(([_, value]) => value)
												.map(([condition]) => (
													<span
														key={condition}
														className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded"
													>
														{condition.charAt(0).toUpperCase() +
															condition.slice(1)}
													</span>
												))
										)}
									</div>
								</div>
							)}
						</div>
					))
				) : (
					<div className="text-center py-8 text-gray-500">
						Nenhum agendamento para esta data
					</div>
				)}
			</div>
		</div>
	);
};

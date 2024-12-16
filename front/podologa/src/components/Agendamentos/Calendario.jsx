import { ChevronLeft, ChevronRight } from "lucide-react";

export const Calendario = ({
	currentDate,
	selectedDate,
	diasDaSemana,
	meses,
	diasCalendario,
	mudarMes,
	selecionarData,
}) => {
	// Usa a data atual caso currentDate não seja fornecido
	const hoje = new Date();
	const dataAtual = currentDate || hoje;

	return (
		<div className="bg-white rounded-lg shadow p-4">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold">
					{meses[dataAtual.getMonth()]} {dataAtual.getFullYear()}
				</h2>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => mudarMes(-1)}
						className="p-1 hover:bg-gray-100 rounded"
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
					<button
						type="button"
						onClick={() => mudarMes(1)}
						className="p-1 hover:bg-gray-100 rounded"
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>

			<div className="grid grid-cols-7 gap-1">
				{diasDaSemana.map((dia) => (
					<div
						key={dia}
						className="text-center text-sm font-medium text-gray-600 py-2"
					>
						{dia}
					</div>
				))}

				{diasCalendario.map((dia, index) => {
					const isSelected =
						dia.mes === "atual" &&
						selectedDate.getDate() === dia.dia &&
						selectedDate.getMonth() === dataAtual.getMonth();

					const isToday =
						dia.mes === "atual" &&
						new Date().getDate() === dia.dia &&
						new Date().getMonth() === dataAtual.getMonth() &&
						new Date().getFullYear() === dataAtual.getFullYear();

					return (
						<button
							type="button"
							key={`${dia.dia}-${dia.mes}-${index}`}
							onClick={() => selecionarData(dia.dia, dia.mes)}
							disabled={dia.mes !== "atual"}
							className={`
                relative aspect-square p-2 text-sm rounded-lg
                ${dia.mes === "atual" ? "hover:bg-purple-50" : "text-gray-400"}
                ${isSelected ? "bg-purple-600 text-white hover:bg-purple-700" : ""}
                ${isToday && !isSelected ? "border-2 border-purple-600" : ""}
              `}
						>
							{dia.dia}
							{dia.temAgendamento && !isSelected && (
								<div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full" />
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
};

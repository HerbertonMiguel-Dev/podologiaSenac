import React from "react";

export const LiberarVagas = ({ selectedDate }) => {
	return (
		<div className="bg-white rounded-lg p-4 shadow">
			<h3 className="text-lg font-semibold text-blue-800 mb-4">
				Liberar vagas
			</h3>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="date-input"
						className="text-sm text-gray-600 block mb-1"
					>
						Escolha uma data
					</label>
					<input
						id="date-input"
						type="date"
						className="w-full border rounded p-2"
						value={selectedDate.toISOString().split("T")[0]}
					/>
				</div>
				<div>
					<label
						htmlFor="vagas-input"
						className="text-sm text-gray-600 block mb-1"
					>
						Qtd de vagas
					</label>
					<input
						id="vagas-input"
						type="number"
						className="w-20 border rounded p-2"
						min="1"
					/>
				</div>
				<button
					type="button"
					className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
				>
					CONFIRMAR
				</button>
			</div>
		</div>
	);
};

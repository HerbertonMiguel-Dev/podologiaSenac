import { ChevronRight } from "lucide-react";
import React from "react";

const ProblemSelection = ({ selectedProblem, onSelectProblem }) => {
	const problems = [
		"Pé rachado",
		"Unha encravada",
		"Calos",
		"Dor intensa no pé",
		"Não sei responder",
	];

	return (
		<div className="mt-8">
			<h3 className="text-lg font-semibold text-gray-800 mb-6">
				Informações adicionais
			</h3>
			<div className="relative">
				<select
					value={selectedProblem}
					onChange={(e) => onSelectProblem(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white"
				>
					<option value="">Selecione um problema</option>
					{problems.map((problem) => (
						<option key={problem} value={problem}>
							{problem}
						</option>
					))}
				</select>
				<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
					<ChevronRight className="w-5 h-5 text-gray-400" />
				</div>
			</div>
		</div>
	);
};

export default ProblemSelection;

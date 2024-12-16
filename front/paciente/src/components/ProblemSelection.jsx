import React, { useState } from "react";

const ProblemSelection = ({ selectedProblems = [], onSelectProblems }) => {
	const problems = [
		"Pé rachado",
		"Unha encravada",
		"Calos",
		"Dor intensa no pé",
		"Não sei responder",
	];

	const handleSelection = (problem) => {
		const isSelected = selectedProblems.includes(problem);
		if (isSelected) {
			onSelectProblems(selectedProblems.filter((p) => p !== problem));
		} else {
			onSelectProblems([...selectedProblems, problem]);
		}
	};

	return (
		<div className="mt-8">
			<h3 className="text-lg font-semibold text-gray-800 mb-6">
				Informações adicionais
			</h3>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-3">
				{problems.map((problem) => (
					<button
						type="button"
						key={problem}
						onClick={() => handleSelection(problem)}
						className={`
              px-3 py-2 rounded-md border text-sm transition-all
              hover:border-blue-400 hover:bg-blue-50
              ${
								selectedProblems.includes(problem)
									? "border-blue-500 bg-blue-100 text-blue-700 font-medium"
									: "border-gray-200 text-gray-600"
							}
            `}
					>
						{problem}
					</button>
				))}
			</div>
		</div>
	);
};

export default ProblemSelection;

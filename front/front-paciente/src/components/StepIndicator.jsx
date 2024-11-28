import React from "react";

const StepIndicator = ({ currentStep }) => {
	const steps = [
		{ number: 1, name: "Escolha da data" },
		{ number: 2, name: "Triagem" },
		{ number: 3, name: "Confirmação" },
	];

	return (
		<div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-6">
			<div className="w-full flex justify-between items-center relative px-8">
				{steps.map((step) => (
					<div key={step.number} className="flex flex-col items-center z-10">
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center
                ${
									step.number === currentStep
										? "bg-orange-500 text-white"
										: step.number < currentStep
											? "bg-gray-200 text-gray-500"
											: "bg-gray-200 text-gray-500"
								}`}
						>
							{step.number}
						</div>
						<span
							className={`text-sm mt-2 ${
								step.number === currentStep ? "text-blue-900" : "text-gray-500"
							}`}
						>
							{step.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default StepIndicator;

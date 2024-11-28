const HealthAssessment = ({ health, onUpdateHealth }) => {
	const conditions = [
		{ name: "Diabetes", key: "diabetes" },
		{ name: "Hipertensão", key: "hipertensao" },
		{ name: "Cardiopatia", key: "cardiopatia" },
		{ name: "Marcapasso", key: "marcapasso" },
		{ name: "Gestante", key: "gestante" },
	];

	return (
		<div>
			<h3 className="text-lg font-semibold text-gray-800 mb-6">
				Avaliação de saúde
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{conditions.map((condition) => (
					<div
						key={condition.key}
						className={
							"flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
						}
					>
						<span className="text-sm text-gray-700 font-medium">
							{condition.name}
						</span>
						<div className="flex items-center gap-3">
							{["SIM", "NÃO"].map((option) => (
								<label
									key={option}
									className={`flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 transition 
										${
											health[condition.key] === option
												? "ring-2 ring-orange-500 bg-orange-50"
												: "hover:bg-gray-100"
										}`}
								>
									<input
										type="radio"
										name={condition.key}
										value={option}
										checked={health[condition.key] === option}
										onChange={(e) =>
											onUpdateHealth(condition.key, e.target.value)
										}
										className="hidden"
										aria-label={`${condition.name}: ${option}`}
									/>
									<span className="text-sm text-gray-700">{option}</span>
								</label>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default HealthAssessment;

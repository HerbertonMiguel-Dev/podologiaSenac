import React from "react";

export const HealthItem = ({ label, value }) => (
	<div className="flex items-center gap-4 mb-3">
		<span className="text-gray-700 w-32">{label}</span>
		<div className="flex gap-4">
			<label className="flex items-center gap-2">
				<input
					type="radio"
					checked={value === true}
					readOnly
					className="w-4 h-4 text-blue-600"
				/>
				<span>SIM</span>
			</label>
			<label className="flex items-center gap-2">
				<input
					type="radio"
					checked={value === false}
					readOnly
					className="w-4 h-4 text-blue-600"
				/>
				<span>NÃO</span>
			</label>
		</div>
	</div>
);

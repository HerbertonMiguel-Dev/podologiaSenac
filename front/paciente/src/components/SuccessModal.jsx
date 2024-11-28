import React from "react";

const SuccessModal = ({ isOpen, onClose, name }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg max-w-xl w-full p-12 text-center">
				<div className="w-20 h-20 mx-auto mb-8">
					<div>
						{/* Insira seu SVG ou ícone aqui */}
						<svg
							width="116"
							height="90"
							viewBox="0 0 116 90"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Icon</title>
							<path
								d="M102.728 2.67292C103.445 1.94177 104.3 1.36092 105.244 0.964392C106.188 0.567862 107.201 0.363617 108.225 0.363617C109.249 0.363617 110.262 0.567862 111.206 0.964392C112.15 1.36092 113.005 1.94177 113.722 2.67292C116.725 5.70742 116.767 10.6109 113.827 13.6979L51.74 87.0929C51.0351 87.867 50.1797 88.4891 49.2261 88.9212C48.2725 89.3533 47.2408 89.5863 46.194 89.606C45.1472 89.6257 44.1075 89.4315 43.1383 89.0355C42.1692 88.6395 41.291 88.05 40.5575 87.3029L2.77854 49.0199C1.32153 47.534 0.505371 45.536 0.505371 43.4549C0.505371 41.3739 1.32153 39.3758 2.77854 37.8899C3.49512 37.1588 4.35037 36.5779 5.29422 36.1814C6.23806 35.7849 7.25153 35.5806 8.27529 35.5806C9.29904 35.5806 10.3125 35.7849 11.2564 36.1814C12.2002 36.5779 13.0555 37.1588 13.772 37.8899L45.818 70.3664L102.518 2.90392L102.728 2.67292Z"
								fill="#005594"
							/>
						</svg>
					</div>
				</div>
				<h2 className="text-2xl mb-10 text-gray-800">
					{name}, seu agendamento foi realizado com sucesso!
				</h2>
				<button
					type="button"
					onClick={onClose}
					className="bg-[#F78B1F] text-white px-16 py-3 text-lg rounded-md hover:bg-[#E67E1C] transition-colors"
				>
					OK!
				</button>
			</div>
		</div>
	);
};

export default SuccessModal;

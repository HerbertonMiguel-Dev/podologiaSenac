import React, { useState } from "react";
import axios from "../../api/axios";

export const LiberarVagas = ({ selectedDate, fetchData }) => {
  const [vagas, setVagas] = useState(10); // Padrão de 10 vagas

  const handleSubmit = async () => {
    if (!selectedDate || vagas <= 0) {
      alert("Por favor, preencha os campos corretamente.");
      return;
    }

    try {
      // Envia a data e o número de vagas para a API
      await axios.post("/vagas/criar-vaga", {
        dias: [selectedDate.toISOString().split("T")[0]], // Envia como array
        totalVagas: vagas,
        disponivel: vagas, // Total inicial é igual ao disponível
      });

      alert(`Liberadas ${vagas} vagas para ${selectedDate.toLocaleDateString()}.`);
      if (fetchData) fetchData(); // Atualiza os dados na interface principal
    } catch (error) {
      console.error("Erro ao criar vaga:", error);
      alert("Ocorreu um erro ao liberar as vagas. Tente novamente.");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
      <h3 className="text-lg font-semibold text-blue-800 mb-6 text-center">
        Liberar vagas
      </h3>
      <div className="flex items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <label
            htmlFor="vagas-input"
            className="text-sm text-gray-600 mb-2"
          >
            Quantidade de vagas
          </label>
          <input
            id="vagas-input"
            type="number"
            className="w-24 border border-gray-300 rounded p-2 text-center"
            min="1"
            value={vagas}
            onChange={(e) => setVagas(Number(e.target.value))}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors shadow-md"
          onClick={handleSubmit}
        >
          CONFIRMAR
        </button>
      </div>
    </div>
  );
};

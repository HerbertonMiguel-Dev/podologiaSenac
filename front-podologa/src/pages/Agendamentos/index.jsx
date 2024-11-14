import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Lock } from 'lucide-react';

const AgendamentoPodologo = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 12));
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 7, 12));
  
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const agendamentos = [
    { nome: 'FILIPE MOTA DA SILVA LOURENCO' },
    { nome: 'NOME DO PACIENTE 2' },
    { nome: 'NOME DO PACIENTE 3' },
    { nome: 'NOME DO PACIENTE 4' },
    { nome: 'NOME DO PACIENTE 5' },
    { nome: 'NOME DO PACIENTE 6' }
  ];

  const getDiasDoMes = (data) => {
    const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
    const ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0);
    
    const diasAnteriores = [];
    const primeiroDiaSemana = primeiroDia.getDay();
    const ultimoDiaMesAnterior = new Date(data.getFullYear(), data.getMonth(), 0).getDate();
    
    for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
      diasAnteriores.push({
        dia: ultimoDiaMesAnterior - i,
        mes: 'anterior'
      });
    }
    
    const diasAtuais = [];
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      diasAtuais.push({
        dia: i,
        mes: 'atual'
      });
    }
    
    const diasPosteriores = [];
    const totalDias = diasAnteriores.length + diasAtuais.length;
    const diasRestantes = 42 - totalDias;
    
    for (let i = 1; i <= diasRestantes; i++) {
      diasPosteriores.push({
        dia: i,
        mes: 'proximo'
      });
    }
    
    return [...diasAnteriores, ...diasAtuais, ...diasPosteriores];
  };

  const mudarMes = (direcao) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direcao, 1));
  };

  const selecionarData = (dia, mes) => {
    if (mes === 'atual') {
      const novaData = new Date(currentDate.getFullYear(), currentDate.getMonth(), dia);
      setSelectedDate(novaData);
    }
  };

  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
  };

  const diasCalendario = getDiasDoMes(currentDate);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Cabeçalho */}
      <div className="flex items-center mb-8 justify-between">
        <div>
        <svg width="176" height="104" viewBox="0 0 176 104" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_175_618)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M94.6371 44.6924C104.407 38.0667 112.439 33.2801 123.697 29.3532C132.117 26.4161 142.327 24.1115 151.303 23.599L161.944 23.1234C161.993 22.4969 147.93 18.2152 146.511 17.8484C129.48 13.4461 108.455 13.3287 91.6937 18.2447C90.5663 20.3978 88.4036 23.1642 87.0384 25.4721C85.4722 28.1201 84.3589 30.6377 83.0381 33.3792C82.799 33.8757 82.7277 34.2673 82.7788 34.6011C82.9067 35.435 83.7987 35.9086 84.7456 36.7607C86.7662 38.5789 92.7386 44.0812 94.6371 44.6924Z" fill="#F78B1F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M112.029 9.33869C116.842 9.26177 121.519 9.37629 126.295 9.98173C128.379 10.246 141.251 11.6295 150.615 15.5476C151.096 15.1357 139.22 8.87982 138.229 8.40378C133.792 6.27506 128.746 4.38258 124.023 3.01066C119.857 1.80055 116.415 1.05662 112.226 0.231719C110.164 -0.1744 110.09 -0.139198 108.526 1.11302C105.24 3.74579 100.937 7.19981 98.2994 10.4387C102.971 10.0597 107.265 9.41485 112.029 9.33869Z" fill="#005594"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M112.812 87.9852C112.16 87.495 116.313 68.7867 98.4857 66.1669C93.5025 65.4343 87.6504 65.9535 83.3946 68.8182C79.9773 71.1187 77.5704 74.7272 76.5834 80.1302C76.3455 79.9783 75.7531 77.0781 75.5668 76.5964C72.2736 68.0787 63.8875 64.5638 55.0215 65.6745C46.7221 66.7143 39.7754 72.5507 38.4979 80.6712L37.9851 84.2533C37.127 83.5516 36.9612 82.587 34.3038 81.0192C32.7746 80.117 31.1088 79.4344 29.4318 78.86C25.7468 77.5977 21.8653 77.0379 18.119 75.9944C16.6705 75.591 14.3836 74.8895 13.5515 73.5465C12.4921 71.8365 13.2602 69.6817 14.9011 68.7572C18.5328 66.7112 23.1057 68.2 26.8954 68.9551L26.8727 60.0393C1.31872 55.9347 -1.31853 73.2599 4.1814 79.4232C9.67322 85.5775 23.1657 85.1506 27.233 88.3939C28.9458 89.7596 28.6462 92.5141 26.9162 93.8139C25.1948 95.1073 22.3237 95.2808 20.2504 95.2317C15.5449 95.1201 12.1512 93.6581 8.24646 91.1896C6.2657 89.9373 7.00205 89.3659 3.8553 92.6154L0 96.734C0.426488 98.0222 7.91798 101.349 9.49078 101.873C17.9059 104.675 32.7434 104.878 37.9498 96.4891C39.07 94.6841 39.2441 93.3634 39.7288 91.3546C42.0727 94.6969 42.3555 96.7238 47.4839 99.4955C49.3666 100.513 51.2044 101.263 53.3073 101.65C55.8501 102.118 58.3671 102.204 60.7968 102.08L60.7159 94.2087C60.0866 94.255 57.7392 94.1916 56.4983 93.9534C55.2756 93.7187 54.2586 93.3163 53.1876 92.6808C51.1374 91.4644 50.0718 89.575 49.5146 87.3126L76.4805 87.3464L76.586 101.6L87.997 101.584L88.0018 82.2159C88.0023 80.5956 88.3333 79.2711 88.6695 78.4471C91.4898 72.7822 98.4935 73.5579 100.477 77.9172C101.305 79.7391 101.36 80.5116 101.361 82.4396L101.369 101.475L112.631 101.49L112.757 93.9704L112.977 94.5683C115.365 102.705 128.796 103.871 135.353 99.7096L138.042 97.9091L138.094 101.478C141.317 101.431 145.634 101.549 148.976 101.581L149.061 87.3717C149.16 87.2861 150.416 94.2252 158.697 99.2185C163.706 102.239 170.184 103.722 176 103.398V94.9685C155.408 94.941 156.689 68.8922 176 69.5735V61.1235C167.413 61.0331 158.035 63.5046 152.508 70.5987C150.323 73.4016 150.082 74.6252 148.82 77.8685C148.003 75.6003 148.292 74.4578 146.731 72.0819C145.619 70.3905 144.342 69.1165 142.555 68.1376C137.79 65.4416 134.025 65.9212 128.638 65.9637L128.629 74.2368C131.003 74.3222 133.182 74.1953 135.261 75.468C137.27 76.6975 138.121 78.4509 137.996 80.3885C137.625 80.5347 131.329 79.9599 130.248 79.9388C127.49 79.8848 125.036 80.1489 122.285 80.4974C117.638 81.0863 114.542 83.4825 112.812 87.9852ZM129.293 86.5308C131.249 86.3336 133.153 86.3435 135.113 86.4585C137.633 86.6063 138.731 86.1022 138.131 89.2309C137.539 92.3139 134.92 94.2131 131.997 94.8355C122.866 96.7801 118.597 87.6091 129.293 86.5308ZM56.2236 73.7091C64.3696 72.3326 67.283 80.8921 65.6319 81.0549C64.7083 81.1461 55.1824 81.0344 53.321 81.0344C49.0306 81.0343 49.0018 81.4441 49.7032 79.4357C50.8019 76.2908 52.909 74.2692 56.2236 73.7091Z" fill="#036DCB"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M85.5547 52.2958C87.0233 50.9893 88.4396 49.7094 89.937 48.433C91.3892 47.195 93.314 45.94 94.637 44.6929C92.7385 44.0817 86.7661 38.5794 84.7455 36.7612C83.7987 35.9091 82.9066 35.4355 82.7788 34.6016C82.7276 34.2678 82.7989 33.8763 83.0381 33.3797C84.3588 30.6382 85.4721 28.1206 87.0384 25.4726C88.4035 23.1646 90.5662 20.3983 91.6936 18.2452C86.4978 19.2238 78.8775 22.6247 73.8515 24.7185C74.341 26.0346 78.2677 30.3362 79.4386 31.5217C81.2154 33.3207 81.5995 33.9009 82.2243 34.6683C79.2853 42.3176 77.4046 49.7883 77.3466 60.7355C77.6441 60.9406 80.7301 57.0304 81.3277 56.4519C82.7474 55.0778 84.0736 53.6135 85.5547 52.2958Z" fill="#F6BF86"/>
            </g>
            <defs>
              <clipPath id="clip0_175_618">
              <rect width="176" height="103.613" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-blue-800">Área do podólogo</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna Esquerda: Calendário e Liberar Vagas */}
        <div className="space-y-6">
          {/* Calendário */}
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-800">
                {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => mudarMes(-1)} 
                  className="p-1 text-blue-800 hover:bg-blue-50 rounded"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => mudarMes(1)} 
                  className="p-1 text-blue-800 hover:bg-blue-50 rounded"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Grade do calendário */}
            <div className="grid grid-cols-7 gap-1">
              {diasDaSemana.map(dia => (
                <div key={dia} className="text-center text-sm font-medium text-blue-800 py-2">
                  {dia}
                </div>
              ))}
              {diasCalendario.map((dia, index) => (
                <div
                  key={index}
                  onClick={() => selecionarData(dia.dia, dia.mes)}
                  className={`
                    text-center py-2 text-sm cursor-pointer hover:bg-gray-50 rounded-full
                    ${selectedDate.getDate() === dia.dia && 
                      selectedDate.getMonth() === currentDate.getMonth() && 
                      dia.mes === 'atual' 
                        ? 'bg-orange-500 text-white hover:bg-orange-600' 
                        : ''}
                    ${dia.mes !== 'atual' ? 'text-gray-400' : 'text-gray-700'}
                  `}
                >
                  {dia.dia}
                </div>
              ))}
            </div>
          </div>

          {/* Seção Liberar vagas */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Liberar vagas</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Escolha uma data</label>
                <input 
                  type="date" 
                  className="w-full border rounded p-2"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Qtd de vagas</label>
                <input type="number" className="w-20 border rounded p-2" min="1" />
              </div>
              <button className="bg-blue-800 text-white px-4 py-2 rounded w-full hover:bg-blue-900 transition-colors">
                CONFIRMAR
              </button>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Lista de Agendamentos */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-800">
              Agendamentos | {formatarData(selectedDate)}
            </h3>
            <div className="text-sm mt-2">
              <p>Vagas liberadas: <span className="font-medium">08</span></p>
              <p>Vagas preenchidas: <span className="font-medium">06</span></p>
              <p className="text-orange-500">Vagas bloqueadas: <span className="font-medium">01</span></p>
            </div>
          </div>

          {/* Lista de pacientes */}
          <div className="space-y-2">
            {agendamentos.map((agendamento, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <span className="text-sm">{agendamento.nome}</span>
                <button className="text-red-500 hover:text-red-700">
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Status das vagas */}
          <div className="mt-4 space-y-2">
            <div className="bg-gray-100 p-2 rounded flex items-center gap-2">
              <Lock size={16} />
              <span className="text-sm">NÃO PREENCHIDO</span>
            </div>
            <div className="bg-orange-50 p-2 rounded flex items-center gap-2">
              <Lock size={16} />
              <span className="text-sm">VAGA BLOQUEADA</span>
            </div>
          </div>

          <button className="mt-6 bg-blue-800 text-white px-4 py-2 rounded w-full hover:bg-blue-900 transition-colors">
            IMPRIMIR AGENDAMENTOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoPodologo;
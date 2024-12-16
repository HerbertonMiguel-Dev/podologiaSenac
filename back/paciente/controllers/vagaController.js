const prisma = require("../../config/db");

// Controlador para listar dias com vagas disponíveis
// Controlador para listar dias com vagas disponíveis
exports.listarDiasDisponiveis = async (req, res) => {
	try {
		const diasDisponiveis = await prisma.vaga.findMany({
			where: {
				disponivel: {
					gt: 0, // Garantir que a vaga tem vagas disponíveis
				},
			},
			select: {
				data: true,
				totalVagas: true,
				disponivel: true,
			},
		});

		// Formatar as datas e incluir as informações de vagas
		const datasComVagas = diasDisponiveis.map((vaga) => ({
			data: dayjs(vaga.data).format("YYYY-MM-DD"),
			totalVagas: vaga.totalVagas,
			disponivel: vaga.disponivel,
		}));

		res.status(200).json(datasComVagas); // Retorna as datas com as vagas e a disponibilidade
	} catch (error) {
		res.status(500).json({
			error: "Erro ao listar dias disponíveis",
			details: error.message,
		});
	}
};

// Controlador para criar novas vagas
const dayjs = require("dayjs"); // Certifique-se de importar dayjs

exports.criarVaga = async (req, res) => {
	const { dias, totalVagas, disponivel } = req.body;

	// Verifica se os parâmetros obrigatórios foram fornecidos
	if (!dias || totalVagas === undefined || disponivel === undefined) {
		return res.status(400).json({
			error:
				"Dias, total de vagas e número de vagas disponíveis são obrigatórios",
		});
	}

	try {
		// Se dias for uma data única (string), converte para um array
		const datas = Array.isArray(dias) ? dias : [dias];

		// Cria as vagas para as datas fornecidas
		const vagasCriadas = [];
		for (const data of datas) {
			// Converte a data para o formato ISO-8601 com hora
			const dataFormatada = dayjs(data).startOf("day").toISOString(); // Exemplo: 2024-12-01T00:00:00.000Z

			const novaVaga = await prisma.vaga.create({
				data: {
					data: dataFormatada,
					totalVagas,
					disponivel,
				},
			});
			vagasCriadas.push(novaVaga);
		}

		res.status(201).json(vagasCriadas); // Retorna as vagas criadas
	} catch (error) {
		res
			.status(500)
			.json({ error: "Erro ao criar vaga", details: error.message });
	}

	
};

exports.listarVagasPorDia = async (req, res) => {
	const { data } = req.params; // Data do parâmetro

	// Verifica se a data foi fornecida no formato correto
	if (!data || !dayjs(data, "YYYY-MM-DD", true).isValid()) {
		return res.status(400).json({
			error: "Data inválida. O formato esperado é YYYY-MM-DD",
		});
	}

	try {
		// Converte a data para o início do dia e final do dia para garantir que estamos pegando todas as vagas desse dia
		const dataInicio = dayjs(data).startOf("day").toISOString();
		const dataFim = dayjs(data).endOf("day").toISOString();

		// Busca as vagas para o dia especificado
		const vagas = await prisma.vaga.findMany({
			where: {
				data: {
					gte: dataInicio,
					lte: dataFim,
				},
			},
			select: {
				totalVagas: true,
				disponivel: true,
			},
		});

		// Verifica se há vagas para o dia
		if (vagas.length === 0) {
			return res.status(404).json({
				error: "Nenhuma vaga encontrada para este dia.",
			});
		}

		// Calcula o total de vagas e o total de vagas disponíveis
		const totalVagas = vagas.reduce((acc, vaga) => acc + vaga.totalVagas, 0);
		const vagasDisponiveis = vagas.reduce((acc, vaga) => acc + vaga.disponivel, 0);

		// Retorna o total de vagas e as vagas disponíveis
		res.status(200).json({
			data,
			totalVagas,
			vagasDisponiveis,
		});
	} catch (error) {
		res.status(500).json({
			error: "Erro ao listar vagas por dia",
			details: error.message,
		});
	}
};

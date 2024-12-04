const dayjs = require("dayjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.criarAgendamento = async (req, res) => {
	try {
		const {
			cpf,
			nome,
			email,
			telefone,
			dataAgendamento,
			problemasSelecionados,
			condicoesDeSaude,
		} = req.body;

		// Primeiro, tenta encontrar o paciente pelo CPF
		let paciente = await prisma.paciente.findUnique({
			where: { cpf: cpf },
		});

		// Se o paciente não existir, cria um novo
		if (!paciente) {
			paciente = await prisma.paciente.create({
				data: {
					cpf,
					nome,
					email,
					telefone,
					...mapearCondicoes(condicoesDeSaude),
				},
			});
		} else {
			// Atualiza as condições de saúde do paciente existente
			paciente = await prisma.paciente.update({
				where: { cpf: cpf },
				data: {
					...mapearCondicoes(condicoesDeSaude),
				},
			});
		}

		// Verifica se o paciente já tem um agendamento ativo
		const agendamentoExistente = await prisma.agendamento.findFirst({
			where: {
				pacienteId: paciente.id,
				status: "pendente", // Verifica se existe um agendamento pendente
			},
		});

		if (agendamentoExistente) {
			return res
				.status(400)
				.json({ error: "O paciente já possui um agendamento ativo" });
		}

		// Converte a data para o início do dia usando dayjs
		const dataAgendamentoInicio = dayjs(dataAgendamento)
			.startOf("day")
			.toDate();

		// Verifica se a vaga existe e se ainda há vagas disponíveis
		const vaga = await prisma.vaga.findFirst({
			where: {
				data: {
					gte: dataAgendamentoInicio,
					lt: dayjs(dataAgendamentoInicio).add(1, "day").toDate(),
				},
			},
		});

		if (!vaga || vaga.disponivel <= 0) {
			return res
				.status(400)
				.json({ error: "Data indisponível para agendamento" });
		}

		// Cria o agendamento com o status "pendente"
		const agendamento = await prisma.agendamento.create({
			data: {
				dataAgendamento: dataAgendamentoInicio,
				pacienteId: paciente.id,
				problemasSelecionados: JSON.stringify(problemasSelecionados),
				status: "pendente", // Marca o agendamento como pendente
			},
		});

		// Atualiza o número de vagas disponíveis
		await prisma.vaga.update({
			where: { id: vaga.id },
			data: { disponivel: vaga.disponivel - 1 },
		});

		res.status(201).json(agendamento);
	} catch (error) {
		console.error("Erro completo:", error);
		res
			.status(500)
			.json({ error: "Erro ao criar agendamento", detalhes: error.message });
	}
};

exports.listarAgendamentos = async (req, res) => {
	try {
		// Busca todos os agendamentos, incluindo as informações do paciente e dos problemas selecionados
		const agendamentos = await prisma.agendamento.findMany({
			include: {
				paciente: true, // Inclui as informações do paciente
			},
		});

		// Retorna os agendamentos encontrados
		res.status(200).json(agendamentos);
	} catch (error) {
		console.error("Erro completo:", error);
		res
			.status(500)
			.json({ error: "Erro ao listar agendamentos", detalhes: error.message });
	}
};

exports.concluirAgendamento = async (req, res) => {
	try {
		const { agendamentoId } = req.params;

		const agendamento = await prisma.agendamento.findUnique({
			where: { id: Number.parseInt(agendamentoId) },
		});

		if (!agendamento) {
			return res.status(404).json({ error: "Agendamento não encontrado" });
		}

		if (agendamento.status !== "pendente") {
			return res.status(400).json({
				error: "O agendamento não pode ser concluído, pois não está pendente",
			});
		}

		const agendamentoAtualizado = await prisma.agendamento.update({
			where: { id: agendamento.id },
			data: { status: "concluído" },
		});

		// Atualiza a vaga, incrementando as vagas disponíveis
		const vaga = await prisma.vaga.findFirst({
			where: {
				data: agendamento.dataAgendamento,
			},
		});

		if (vaga) {
			await prisma.vaga.update({
				where: { id: vaga.id },
				data: { disponivel: vaga.disponivel + 1 },
			});
		}

		res.status(200).json(agendamentoAtualizado);
	} catch (error) {
		console.error("Erro completo:", error);
		res.status(500).json({
			error: "Erro ao concluir agendamento",
			detalhes: error.message,
		});
	}
};

exports.deletarAgendamento = async (req, res) => {
	try {
		const { agendamentoId } = req.params; // Recebe o ID do agendamento via parâmetros da URL

		// Verifica se o agendamento existe
		const agendamento = await prisma.agendamento.findUnique({
			where: { id: Number.parseInt(agendamentoId) },
		});

		if (!agendamento) {
			return res.status(404).json({ error: "Agendamento não encontrado" });
		}

		// Deleta o agendamento
		await prisma.agendamento.delete({
			where: { id: agendamento.id },
		});

		// Atualiza a vaga, liberando a vaga que foi agendada
		const vaga = await prisma.vaga.findFirst({
			where: {
				data: agendamento.dataAgendamento,
			},
		});

		if (vaga) {
			await prisma.vaga.update({
				where: { id: vaga.id },
				data: { disponivel: vaga.disponivel + 1 }, // Libera a vaga
			});
		}

		res.status(200).json({ message: "Agendamento deletado com sucesso" });
	} catch (error) {
		console.error("Erro completo:", error);
		res.status(500).json({
			error: "Erro ao deletar agendamento",
			detalhes: error.message,
		});
	}
};

function mapearCondicoes(condicoes) {
	return {
		diabetes: condicoes.diabetes === "SIM",
		hipertensao: condicoes.hipertensao === "SIM",
		cardiopatia: condicoes.cardiopatia === "SIM",
		marcapasso: condicoes.marcapasso === "SIM",
		gestante: condicoes.gestante === "SIM",
	};
}

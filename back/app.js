// app.js ou server.js

const express = require("express");
const pacienteRoutes = require("./paciente/routes/pacienteRoutes"); // Caminho para as rotas de paciente
const vagaRoutes = require("./paciente/routes/vagaRoutes");
const agendamentoRoutes = require("./paciente/routes/agendamentoRoutes");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/paciente", pacienteRoutes); // Prefixo para as rotas de paciente
app.use("/vagas", vagaRoutes);
app.use("/agendamento", agendamentoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

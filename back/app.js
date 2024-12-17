// app.js ou server.js

const express = require("express");
const pacienteRoutes = require("./paciente/routes/pacienteRoutes"); // Caminho para as rotas de paciente
const vagaRoutes = require("./paciente/routes/vagaRoutes");
const agendamentoRoutes = require("./paciente/routes/agendamentoRoutes");
const usuarioRoutes = require("./podologa/routes/usuarioRoutes"); // Caminho para as rotas de usuário
const authUserRoutes = require("./podologa/routes/AuthUserRoutes"); // Caminho para as rotas de autenticação de usuário
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/paciente", pacienteRoutes); // Prefixo para as rotas de paciente
app.use("/vagas", vagaRoutes);
app.use("/agendamento", agendamentoRoutes);
app.use("/create", usuarioRoutes); // Adicionando o prefixo para as rotas de usuário
app.use("/auth", authUserRoutes); // Prefixo para as rotas de autenticação de usuário

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

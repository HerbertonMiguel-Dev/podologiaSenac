require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Rota para dados pessoais
app.post('/dados-pessoais', (req, res) => {
    const { nome, email, telefone, cpf } = req.body;
    // Aqui, você pode adicionar a lógica para salvar os dados em um banco de dados
    console.log('Dados pessoais recebidos:', { nome, email, telefone, cpf });
    res.status(201).json({ message: 'Dados pessoais salvos com sucesso!' });
});

// Rota para avaliação de saúde
app.post('/avaliacao-saude', (req, res) => {
    const { diabetes, hipertensao, cardiopatia, marcapasso, gestante } = req.body;
    // Lógica para processar as respostas da triagem
    console.log('Avaliação de saúde recebida:', { diabetes, hipertensao, cardiopatia, marcapasso, gestante });
    res.status(201).json({ message: 'Avaliação de saúde salva com sucesso!' });
});

// Rota para o processo de agendamento
app.post('/agendamento', (req, res) => {
    const { dataEscolhida, etapa } = req.body;
    // Lógica para salvar a etapa e data escolhida para o serviço
    console.log('Agendamento recebido:', { dataEscolhida, etapa });
    res.status(201).json({ message: 'Agendamento realizado com sucesso!' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

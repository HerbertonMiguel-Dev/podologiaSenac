// syncDB.js
const sequelize = require('./config/db');
const Paciente = require('./paciente/models/pacienteModel');
const Agendamento = require('./paciente/models/modelAgendamento');
const Vaga = require('./paciente/models/modelVaga');

// Definindo associações entre os modelos
Paciente.hasMany(Agendamento, { foreignKey: 'pacienteId' });
Agendamento.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Vaga.hasMany(Agendamento, { foreignKey: 'vagaId' });
Agendamento.belongsTo(Vaga, { foreignKey: 'vagaId' });

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincroniza todos os modelos e cria as tabelas, preservando dados existentes
    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas com sucesso.');

    process.exit();
  } catch (error) {
    console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
    process.exit(1);
  }
};

syncDatabase();

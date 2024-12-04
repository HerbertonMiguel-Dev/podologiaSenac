Aqui está o conteúdo para o arquivo `README.md` do seu projeto **backend**:

---

# Backend - Gerenciador de Agenda de Consultas

Este é o backend de um sistema para gerenciar a agenda de consultas médicas, desenvolvido com **Node.js** e **MySQL**.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript no servidor.
- **Express** - Framework web para Node.js.
- **Sequelize** - ORM para trabalhar com bancos de dados relacionais.
- **MySQL** - Banco de dados relacional.
- **dotenv** - Gerenciamento de variáveis de ambiente.
- **cors** - Permite requisições de diferentes origens.
- **body-parser** - Middleware para parsing de requisições JSON.

## 📂 Estrutura do Projeto

```
/backend
├── config
│   ├── db.js          # Configuração do banco de dados
│   ├── dotenv.js      # Carregamento de variáveis de ambiente
├── controllers        # Controladores da aplicação
├── models             # Modelos do Sequelize
├── routes             # Definições de rotas
├── middlewares        # Middlewares da aplicação
├── services           # Serviços reutilizáveis
├── app.js             # Inicialização do aplicativo Express
├── server.js          # Configuração do servidor HTTP
└── package.json       # Gerenciador de dependências do Node.js
```

## 🚀 Configuração do Ambiente

### 1. Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [MySQL](https://www.mysql.com/)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### 2. Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu_usuario/backend-consultas.git
   cd backend-consultas
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:
   ```
   DB_HOST=localhost
   DB_NAME=consultas_db
   DB_USER=root
   DB_PASSWORD=sua_senha
   PORT=5000
   ```

4. Configure o banco de dados:
   - Certifique-se de que o MySQL está rodando e crie o banco de dados:
     ```sql
     CREATE DATABASE consultas_db;
     ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

   O servidor estará disponível em `http://localhost:5000`.

### 3. Scripts Disponíveis

- **`npm start`**: Inicia o servidor em produção.
- **`npm run dev`**: Inicia o servidor em modo de desenvolvimento com nodemon.
- **`npm run lint`**: Executa o linting no código.

## 📄 Endpoints da API

### **Base URL**: `http://localhost:5000/api`

| Método | Rota                  | Descrição                        |
|--------|------------------------|----------------------------------|
| GET    | `/appointments`        | Lista todas as consultas         |
| POST   | `/appointments`        | Cria uma nova consulta           |
| GET    | `/appointments/:id`    | Busca uma consulta específica    |
| PUT    | `/appointments/:id`    | Atualiza uma consulta existente  |
| DELETE | `/appointments/:id`    | Remove uma consulta              |

## 🗂️ Estrutura de Dados

### **Modelo de Consulta (Appointment)**

| Campo        | Tipo        | Descrição                       |
|--------------|-------------|----------------------------------|
| `id`         | Inteiro     | Identificador único da consulta |
| `patientName`| String      | Nome do paciente                |
| `date`       | Date        | Data e hora da consulta         |
| `status`     | String      | Status da consulta (`scheduled`, `completed`, `cancelled`) |

## 🤝 Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

---

### Contato

- **E-mail:** seu.email@dominio.com
- **LinkedIn:** [Seu Perfil](https://www.linkedin.com/in/seu-perfil)

---


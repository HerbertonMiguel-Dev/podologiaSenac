 

```markdown
# Sistema de Gestão para Podologia (Projeto Integrador turma 235)

Este projeto é composto por um back-end e dois front-ends distintos: um para o gerenciamento de podólogos e outro para o gerenciamento de pacientes.

---

## Configuração do Back-End

1. Acesse a pasta do back-end:
   ```bash
   cd back
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` na raiz do projeto com o seguinte conteúdo para configurar o banco de dados SQLite:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```

4. Execute os seguintes comandos para configurar o banco de dados:

   - Gere o cliente Prisma:
     ```bash
     npx prisma generate
     ```

   - Sincronize o banco de dados:
     ```bash
     npx prisma migrate dev --name init
     ```

5. Inicie o servidor:
   ```bash
   npm start
   ```

---

## Configuração dos Front-Ends

### Front-End Podóloga

1. Acesse a pasta do front-end da podóloga:
   ```bash
   cd front/podologa
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

### Front-End Paciente

1. Acesse a pasta do front-end do paciente:
   ```bash
   cd front/paciente
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## Observação

- Certifique-se de que todas as variáveis de ambiente estão corretamente configuradas no arquivo `.env` antes de iniciar o projeto.
- O banco de dados padrão utiliza SQLite, mas você pode alterar o provedor de banco de dados no arquivo `schema.prisma` e atualizar o `DATABASE_URL` no `.env` para refletir essas mudanças.
```
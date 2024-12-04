-- CreateTable
CREATE TABLE "Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "diabetes" BOOLEAN,
    "hipertensao" BOOLEAN,
    "cardiopatia" BOOLEAN,
    "marcapasso" BOOLEAN,
    "gestante" BOOLEAN
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataAgendamento" DATETIME NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    CONSTRAINT "Agendamento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vaga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "totalVagas" INTEGER NOT NULL,
    "disponivel" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_email_key" ON "Paciente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");

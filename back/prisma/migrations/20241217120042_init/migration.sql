/*
  Warnings:

  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Paciente_cpf_key";

-- DropIndex
DROP INDEX "Paciente_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Paciente";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criado_em" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "idade" INTEGER,
    "diabetes" BOOLEAN,
    "hipertensao" BOOLEAN,
    "cardiopatia" BOOLEAN,
    "marcapasso" BOOLEAN,
    "gestante" BOOLEAN,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "pacientes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataAgendamento" DATETIME NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "problemasSelecionados" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    CONSTRAINT "Agendamento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agendamento" ("dataAgendamento", "id", "pacienteId", "problemasSelecionados", "status") SELECT "dataAgendamento", "id", "pacienteId", "problemasSelecionados", "status" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_email_key" ON "pacientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cpf_key" ON "pacientes"("cpf");

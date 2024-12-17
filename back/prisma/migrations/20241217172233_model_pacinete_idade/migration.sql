/*
  Warnings:

  - Made the column `idade` on table `pacientes` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pacientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "diabetes" BOOLEAN,
    "hipertensao" BOOLEAN,
    "cardiopatia" BOOLEAN,
    "marcapasso" BOOLEAN,
    "gestante" BOOLEAN,
    "usuario_id" TEXT,
    CONSTRAINT "pacientes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pacientes" ("cardiopatia", "cpf", "diabetes", "email", "gestante", "hipertensao", "id", "idade", "marcapasso", "nome", "telefone", "usuario_id") SELECT "cardiopatia", "cpf", "diabetes", "email", "gestante", "hipertensao", "id", "idade", "marcapasso", "nome", "telefone", "usuario_id" FROM "pacientes";
DROP TABLE "pacientes";
ALTER TABLE "new_pacientes" RENAME TO "pacientes";
CREATE UNIQUE INDEX "pacientes_email_key" ON "pacientes"("email");
CREATE UNIQUE INDEX "pacientes_cpf_key" ON "pacientes"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataAgendamento" DATETIME NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "problemasSelecionados" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    CONSTRAINT "Agendamento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agendamento" ("dataAgendamento", "id", "pacienteId", "problemasSelecionados") SELECT "dataAgendamento", "id", "pacienteId", "problemasSelecionados" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

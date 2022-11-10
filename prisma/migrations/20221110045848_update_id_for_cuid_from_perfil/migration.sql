/*
  Warnings:

  - The primary key for the `Perfil` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Perfil" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Perfil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Perfil" ("created_at", "id", "nome", "tipo", "userId") SELECT "created_at", "id", "nome", "tipo", "userId" FROM "Perfil";
DROP TABLE "Perfil";
ALTER TABLE "new_Perfil" RENAME TO "Perfil";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

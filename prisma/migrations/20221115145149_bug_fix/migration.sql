/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Perfil` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "perfil_admin" (
    "perfilId" TEXT NOT NULL,
    "grau_de_parentesco" TEXT NOT NULL,
    CONSTRAINT "perfil_admin_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "perfil_gamer" (
    "perfilId" TEXT NOT NULL,
    "grau_serie" TEXT NOT NULL,
    CONSTRAINT "perfil_gamer_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "perfil_admin" ("perfilId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Modelo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Licao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "id_modelo" INTEGER NOT NULL,
    "id_disciplina" INTEGER NOT NULL,
    "nota" TEXT,
    "id_perfil_admin" TEXT NOT NULL,
    "id_perfil_gamer" TEXT NOT NULL,
    CONSTRAINT "Licao_id_perfil_admin_fkey" FOREIGN KEY ("id_perfil_admin") REFERENCES "perfil_admin" ("perfilId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Licao_id_perfil_gamer_fkey" FOREIGN KEY ("id_perfil_gamer") REFERENCES "perfil_gamer" ("perfilId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Licao_id_modelo_fkey" FOREIGN KEY ("id_modelo") REFERENCES "Modelo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Licao_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "perfil_admin_perfilId_key" ON "perfil_admin"("perfilId");

-- CreateIndex
CREATE UNIQUE INDEX "perfil_gamer_perfilId_key" ON "perfil_gamer"("perfilId");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nome_key" ON "Disciplina"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Modelo_nome_key" ON "Modelo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_id_key" ON "Perfil"("id");

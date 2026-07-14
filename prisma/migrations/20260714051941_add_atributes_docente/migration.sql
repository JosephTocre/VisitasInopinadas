/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Docente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `Docente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefono]` on the table `Docente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Docente" ADD COLUMN     "correo" TEXT,
ADD COLUMN     "dni" TEXT,
ADD COLUMN     "telefono" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Docente_dni_key" ON "Docente"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_correo_key" ON "Docente"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_telefono_key" ON "Docente"("telefono");

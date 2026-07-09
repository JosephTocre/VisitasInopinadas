/*
  Warnings:

  - You are about to drop the column `apellido_docente` on the `ControlDocente` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_docente` on the `ControlDocente` table. All the data in the column will be lost.
  - Added the required column `docenteId` to the `ControlDocente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ControlDocente" DROP COLUMN "apellido_docente",
DROP COLUMN "nombre_docente",
ADD COLUMN     "docenteId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Docente" (
    "id_docente" SERIAL NOT NULL,
    "nombre_docente" TEXT NOT NULL,
    "apellido_docente" TEXT NOT NULL,

    CONSTRAINT "Docente_pkey" PRIMARY KEY ("id_docente")
);

-- AddForeignKey
ALTER TABLE "ControlDocente" ADD CONSTRAINT "ControlDocente_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id_docente") ON DELETE RESTRICT ON UPDATE CASCADE;

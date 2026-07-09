/*
  Warnings:

  - You are about to drop the column `curso` on the `HechoVisita` table. All the data in the column will be lost.
  - You are about to drop the column `sede` on the `HechoVisita` table. All the data in the column will be lost.
  - Added the required column `cursoId` to the `HechoVisita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sedeId` to the `HechoVisita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Docente" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "HechoVisita" DROP COLUMN "curso",
DROP COLUMN "sede",
ADD COLUMN     "cursoId" INTEGER NOT NULL,
ADD COLUMN     "sedeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Sede" (
    "id_sede" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Sede_pkey" PRIMARY KEY ("id_sede")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id_curso" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id_curso")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sede_nombre_key" ON "Sede"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_nombre_key" ON "Curso"("nombre");

-- AddForeignKey
ALTER TABLE "HechoVisita" ADD CONSTRAINT "HechoVisita_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id_sede") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HechoVisita" ADD CONSTRAINT "HechoVisita_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

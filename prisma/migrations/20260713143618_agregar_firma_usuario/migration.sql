/*
  Warnings:

  - You are about to drop the column `firma` on the `HechoVisita` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HechoVisita" DROP COLUMN "firma",
ADD COLUMN     "firma_docente" TEXT;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "firma" TEXT;

-- CreateIndex
CREATE INDEX "HechoVisita_sedeId_idx" ON "HechoVisita"("sedeId");

-- CreateIndex
CREATE INDEX "HechoVisita_cursoId_idx" ON "HechoVisita"("cursoId");

-- CreateIndex
CREATE INDEX "HechoVisita_usuarioId_fecha_idx" ON "HechoVisita"("usuarioId", "fecha");

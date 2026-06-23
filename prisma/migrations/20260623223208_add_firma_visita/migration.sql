-- AlterTable
ALTER TABLE "HechoVisita" ADD COLUMN     "fechaFirma" TIMESTAMP(3),
ADD COLUMN     "firma" TEXT,
ADD COLUMN     "firmado" BOOLEAN NOT NULL DEFAULT false;

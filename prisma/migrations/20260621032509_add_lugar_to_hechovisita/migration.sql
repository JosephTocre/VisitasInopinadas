/*
  Warnings:

  - Changed the type of `tema_programado` on the `ControlGuia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `logro` on the `ControlGuia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rubrica` on the `ControlGuia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `lugar` to the `HechoVisita` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoCumplimiento" AS ENUM ('CUMPLE', 'NO_CUMPLE', 'NO_APLICA');

-- AlterTable
ALTER TABLE "ControlGuia" DROP COLUMN "tema_programado",
ADD COLUMN     "tema_programado" "EstadoCumplimiento" NOT NULL,
DROP COLUMN "logro",
ADD COLUMN     "logro" "EstadoCumplimiento" NOT NULL,
DROP COLUMN "rubrica",
ADD COLUMN     "rubrica" "EstadoCumplimiento" NOT NULL;

-- AlterTable
ALTER TABLE "HechoVisita" ADD COLUMN     "lugar" TEXT NOT NULL;

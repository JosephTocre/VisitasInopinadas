/*
  Warnings:

  - You are about to drop the column `requerimientos` on the `HechoVisita` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ControlGuia" ADD COLUMN     "requerimientos" TEXT;

-- AlterTable
ALTER TABLE "HechoVisita" DROP COLUMN "requerimientos";

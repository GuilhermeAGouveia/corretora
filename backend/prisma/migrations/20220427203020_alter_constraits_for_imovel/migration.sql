/*
  Warnings:

  - Made the column `price` on table `Imovel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mensalidade` on table `Imovel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Imovel` MODIFY `price` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `mensalidade` DOUBLE NOT NULL DEFAULT 0;

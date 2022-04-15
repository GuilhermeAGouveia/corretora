/*
  Warnings:

  - The values [APARTAMENTO] on the enum `Imovel_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `is_Partner` on the `Locador` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Telefone` table. All the data in the column will be lost.
  - Added the required column `is_partner` to the `Locador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Imovel` MODIFY `type` ENUM('CASA', 'APTO') NOT NULL DEFAULT 'CASA';

-- AlterTable
ALTER TABLE `Locador` DROP COLUMN `is_Partner`,
    ADD COLUMN `is_partner` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Telefone` DROP COLUMN `tipo`;

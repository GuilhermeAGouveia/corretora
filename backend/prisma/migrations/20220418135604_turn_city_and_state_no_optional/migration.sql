/*
  Warnings:

  - Made the column `city` on table `Pessoa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Pessoa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Pessoa` MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `state` VARCHAR(191) NOT NULL;

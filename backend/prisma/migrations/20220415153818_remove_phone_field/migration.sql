/*
  Warnings:

  - You are about to drop the column `phone` on the `Pessoa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Pessoa` DROP COLUMN `phone`,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL;

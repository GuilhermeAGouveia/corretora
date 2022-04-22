/*
  Warnings:

  - You are about to drop the column `birthdate` on the `Locatario` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Locatario` DROP COLUMN `birthdate`;

-- AlterTable
ALTER TABLE `Pessoa` ADD COLUMN `birthdate` DATETIME(3) NOT NULL;

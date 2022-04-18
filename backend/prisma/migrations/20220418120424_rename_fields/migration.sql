/*
  Warnings:

  - The primary key for the `Associado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nome` on the `Associado` table. All the data in the column will be lost.
  - You are about to drop the column `commissao` on the `Corretor_Locador` table. All the data in the column will be lost.
  - Added the required column `name` to the `Associado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Associado` DROP PRIMARY KEY,
    DROP COLUMN `nome`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`name`, `cod_lct`);

-- AlterTable
ALTER TABLE `Corretor_Locador` DROP COLUMN `commissao`,
    ADD COLUMN `commission` DOUBLE NOT NULL DEFAULT 0;

/*
  Warnings:

  - The primary key for the `Telefone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pessoaId` on the `Telefone` table. All the data in the column will be lost.
  - Added the required column `idPessoa` to the `Telefone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Telefone` DROP FOREIGN KEY `Telefone_pessoaId_fkey`;

-- AlterTable
ALTER TABLE `Telefone` DROP PRIMARY KEY,
    DROP COLUMN `pessoaId`,
    ADD COLUMN `idPessoa` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`numero`, `idPessoa`);

-- CreateTable
CREATE TABLE `Contrato` (
    `cod_cor` VARCHAR(191) NOT NULL,
    `cod_imv` VARCHAR(191) NOT NULL,
    `cod_lct` VARCHAR(191) NOT NULL,
    `date_init` DATETIME(3) NOT NULL,
    `date_end` DATETIME(3) NOT NULL,
    `type` ENUM('LOCACAO', 'VENDA') NOT NULL DEFAULT 'LOCACAO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cod_cor`, `cod_imv`, `cod_lct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_idPessoa_fkey` FOREIGN KEY (`idPessoa`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_cod_lct_fkey` FOREIGN KEY (`cod_lct`) REFERENCES `Locatario`(`cod_lct`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_cod_cor_fkey` FOREIGN KEY (`cod_cor`) REFERENCES `Corretor`(`cod_cor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_cod_imv_fkey` FOREIGN KEY (`cod_imv`) REFERENCES `Imovel`(`cod_imv`) ON DELETE RESTRICT ON UPDATE CASCADE;

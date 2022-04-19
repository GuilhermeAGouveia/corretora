/*
  Warnings:

  - You are about to drop the column `describe` on the `Imovel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Imovel` DROP COLUMN `describe`,
    ADD COLUMN `area` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `hasGarage` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `hasGarden` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `hasSuite` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isFurnished` ENUM('FULL', 'SEMI', 'NONE') NOT NULL DEFAULT 'NONE',
    ADD COLUMN `mensalidade` DOUBLE NULL,
    ADD COLUMN `nApto` INTEGER NULL,
    ADD COLUMN `nBathrooms` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `nRooms` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `price` DOUBLE NULL,
    ADD COLUMN `supDescribe` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Regras_Imovel` (
    `cod_imv` VARCHAR(191) NOT NULL,
    `regra` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cod_imv`, `regra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Regras_Imovel` ADD CONSTRAINT `Regras_Imovel_cod_imv_fkey` FOREIGN KEY (`cod_imv`) REFERENCES `Imovel`(`cod_imv`) ON DELETE CASCADE ON UPDATE CASCADE;

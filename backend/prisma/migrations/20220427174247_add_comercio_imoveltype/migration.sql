-- AlterTable
ALTER TABLE `Imovel` MODIFY `type` ENUM('CASA', 'APTO', 'COMERCIO') NOT NULL DEFAULT 'CASA',
    ALTER COLUMN `area` DROP DEFAULT;
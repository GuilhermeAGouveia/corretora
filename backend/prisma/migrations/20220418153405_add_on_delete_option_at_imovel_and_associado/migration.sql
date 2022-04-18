-- DropForeignKey
ALTER TABLE `Associado` DROP FOREIGN KEY `Associado_cod_lct_fkey`;

-- AddForeignKey
ALTER TABLE `Associado` ADD CONSTRAINT `Associado_cod_lct_fkey` FOREIGN KEY (`cod_lct`) REFERENCES `Locatario`(`cod_lct`) ON DELETE CASCADE ON UPDATE CASCADE;

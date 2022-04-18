-- DropForeignKey
ALTER TABLE `Corretor` DROP FOREIGN KEY `Corretor_cod_cor_fkey`;

-- DropForeignKey
ALTER TABLE `Locador` DROP FOREIGN KEY `Locador_cod_lcd_fkey`;

-- DropForeignKey
ALTER TABLE `Locatario` DROP FOREIGN KEY `Locatario_cod_lct_fkey`;

-- AddForeignKey
ALTER TABLE `Locador` ADD CONSTRAINT `Locador_cod_lcd_fkey` FOREIGN KEY (`cod_lcd`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locatario` ADD CONSTRAINT `Locatario_cod_lct_fkey` FOREIGN KEY (`cod_lct`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Corretor` ADD CONSTRAINT `Corretor_cod_cor_fkey` FOREIGN KEY (`cod_cor`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

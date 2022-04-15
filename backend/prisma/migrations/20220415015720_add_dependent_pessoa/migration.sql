-- CreateTable
CREATE TABLE `Locador` (
    `cod_lcd` VARCHAR(191) NOT NULL,
    `is_Partner` BOOLEAN NOT NULL,

    PRIMARY KEY (`cod_lcd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locatario` (
    `cod_lct` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cod_lct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Corretor` (
    `cod_cor` VARCHAR(191) NOT NULL,
    `is_Partner` BOOLEAN NOT NULL,

    PRIMARY KEY (`cod_cor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Locador` ADD CONSTRAINT `Locador_cod_lcd_fkey` FOREIGN KEY (`cod_lcd`) REFERENCES `Pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locatario` ADD CONSTRAINT `Locatario_cod_lct_fkey` FOREIGN KEY (`cod_lct`) REFERENCES `Pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Corretor` ADD CONSTRAINT `Corretor_cod_cor_fkey` FOREIGN KEY (`cod_cor`) REFERENCES `Pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

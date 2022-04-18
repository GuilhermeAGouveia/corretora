-- CreateTable
CREATE TABLE `Corretor_Locador` (
    `cod_cor` VARCHAR(191) NOT NULL,
    `cod_lcd` VARCHAR(191) NOT NULL,
    `commissao` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cod_cor`, `cod_lcd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Corretor_Locador` ADD CONSTRAINT `Corretor_Locador_cod_lcd_fkey` FOREIGN KEY (`cod_lcd`) REFERENCES `Locador`(`cod_lcd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Corretor_Locador` ADD CONSTRAINT `Corretor_Locador_cod_cor_fkey` FOREIGN KEY (`cod_cor`) REFERENCES `Corretor`(`cod_cor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `Imovel` (
    `cod_imv` VARCHAR(191) NOT NULL,
    `cod_lcd` VARCHAR(191) NOT NULL,
    `type` ENUM('CASA', 'APARTAMENTO') NOT NULL DEFAULT 'CASA',
    `address` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `describe` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cod_imv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Imovel` ADD CONSTRAINT `Imovel_cod_lcd_fkey` FOREIGN KEY (`cod_lcd`) REFERENCES `Locador`(`cod_lcd`) ON DELETE RESTRICT ON UPDATE CASCADE;

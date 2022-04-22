-- CreateTable
CREATE TABLE `Pessoa` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Pessoa_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone` (
    `numero` VARCHAR(191) NOT NULL,
    `idPessoa` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`numero`, `idPessoa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locador` (
    `cod_lcd` VARCHAR(191) NOT NULL,
    `is_partner` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`cod_lcd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locatario` (
    `cod_lct` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cod_lct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Imovel` (
    `cod_imv` VARCHAR(191) NOT NULL,
    `cod_lcd` VARCHAR(191) NOT NULL,
    `type` ENUM('CASA', 'APTO') NOT NULL DEFAULT 'CASA',
    `address` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `nApto` INTEGER NULL,
    `hasGarage` BOOLEAN NOT NULL DEFAULT false,
    `hasGarden` BOOLEAN NOT NULL DEFAULT false,
    `hasSuite` BOOLEAN NOT NULL DEFAULT false,
    `nRooms` INTEGER NOT NULL DEFAULT 0,
    `nBathrooms` INTEGER NOT NULL DEFAULT 0,
    `area` DOUBLE NOT NULL DEFAULT 0,
    `isFurnished` ENUM('FULL', 'SEMI', 'NONE') NOT NULL DEFAULT 'NONE',
    `supDescribe` VARCHAR(191) NULL,
    `price` DOUBLE NULL,
    `mensalidade` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cod_imv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Regras_Imovel` (
    `cod_imv` VARCHAR(191) NOT NULL,
    `regra` VARCHAR(191) NOT NULL,
    `priority` ENUM('IMPORTANT', 'DESIRABLE', 'NORMAL') NOT NULL DEFAULT 'NORMAL',

    PRIMARY KEY (`cod_imv`, `regra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Associado` (
    `name` VARCHAR(191) NOT NULL,
    `cod_lct` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NULL,
    `tipo` ENUM('CONJUGE', 'FILHO', 'IRMAO', 'PAI', 'MAE', 'OUTRO') NOT NULL DEFAULT 'OUTRO',

    PRIMARY KEY (`name`, `cod_lct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrato` (
    `cod_imv` VARCHAR(191) NOT NULL,
    `cod_lct` VARCHAR(191) NOT NULL,
    `cod_lcd` VARCHAR(191) NOT NULL,
    `dateInit` DATETIME(3) NULL,
    `dateEnd` DATETIME(3) NULL,
    `type` ENUM('LOCACAO', 'VENDA') NOT NULL DEFAULT 'LOCACAO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cod_imv`, `cod_lct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `key` VARCHAR(191) NOT NULL,
    `idOwner` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `originalname` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_idPessoa_fkey` FOREIGN KEY (`idPessoa`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locador` ADD CONSTRAINT `Locador_cod_lcd_fkey` FOREIGN KEY (`cod_lcd`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locatario` ADD CONSTRAINT `Locatario_cod_lct_fkey` FOREIGN KEY (`cod_lct`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imovel` ADD CONSTRAINT `Imovel_cod_lcd_fkey` FOREIGN KEY (`cod_lcd`) REFERENCES `Locador`(`cod_lcd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Regras_Imovel` ADD CONSTRAINT `Regras_Imovel_cod_imv_fkey` FOREIGN KEY (`cod_imv`) REFERENCES `Imovel`(`cod_imv`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Associado` ADD CONSTRAINT `Associado_cod_lct_fkey` FOREIGN KEY (`cod_lct`) REFERENCES `Locatario`(`cod_lct`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_cod_lcd_fkey` FOREIGN KEY (`cod_lcd`) REFERENCES `Locador`(`cod_lcd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_cod_lct_fkey` FOREIGN KEY (`cod_lct`) REFERENCES `Locatario`(`cod_lct`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_cod_imv_fkey` FOREIGN KEY (`cod_imv`) REFERENCES `Imovel`(`cod_imv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_idOwner_fkey` FOREIGN KEY (`idOwner`) REFERENCES `Imovel`(`cod_imv`) ON DELETE CASCADE ON UPDATE CASCADE;

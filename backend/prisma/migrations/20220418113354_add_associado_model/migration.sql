-- CreateTable
CREATE TABLE `Associado` (
    `nome` VARCHAR(191) NOT NULL,
    `cod_lct` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`nome`, `cod_lct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Associado` ADD CONSTRAINT `Associado_cod_lct_fkey` FOREIGN KEY (`cod_lct`) REFERENCES `Locatario`(`cod_lct`) ON DELETE RESTRICT ON UPDATE CASCADE;

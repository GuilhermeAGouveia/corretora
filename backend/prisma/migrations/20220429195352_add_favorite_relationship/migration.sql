-- CreateTable
CREATE TABLE `FavoriteImovel` (
    `idPessoa` VARCHAR(191) NOT NULL,
    `idImovel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPessoa`, `idImovel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FavoriteImovel` ADD CONSTRAINT `FavoriteImovel_idPessoa_fkey` FOREIGN KEY (`idPessoa`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteImovel` ADD CONSTRAINT `FavoriteImovel_idImovel_fkey` FOREIGN KEY (`idImovel`) REFERENCES `Imovel`(`cod_imv`) ON DELETE CASCADE ON UPDATE CASCADE;

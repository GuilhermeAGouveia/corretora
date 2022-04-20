-- CreateTable
CREATE TABLE `Image` (
    `key` VARCHAR(191) NOT NULL,
    `idOwner` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_idOwner_fkey` FOREIGN KEY (`idOwner`) REFERENCES `Imovel`(`cod_imv`) ON DELETE CASCADE ON UPDATE CASCADE;

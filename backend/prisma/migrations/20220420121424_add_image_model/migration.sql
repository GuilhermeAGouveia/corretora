/*
  Warnings:

  - You are about to drop the column `date_end` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `date_init` on the `Contrato` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Contrato` DROP COLUMN `date_end`,
    DROP COLUMN `date_init`,
    ADD COLUMN `dateEnd` DATETIME(3) NULL,
    ADD COLUMN `dateInit` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_id_fkey` FOREIGN KEY (`id`) REFERENCES `Imovel`(`cod_imv`) ON DELETE CASCADE ON UPDATE CASCADE;

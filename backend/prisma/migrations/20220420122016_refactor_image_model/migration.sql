/*
  Warnings:

  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idElement` on the `Image` table. All the data in the column will be lost.
  - Added the required column `idOwner` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_idElement_fkey`;

-- AlterTable
ALTER TABLE `Image` DROP PRIMARY KEY,
    DROP COLUMN `idElement`,
    ADD COLUMN `idOwner` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idOwner`, `url`);

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_idOwner_fkey` FOREIGN KEY (`idOwner`) REFERENCES `Imovel`(`cod_imv`) ON DELETE CASCADE ON UPDATE CASCADE;

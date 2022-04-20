/*
  Warnings:

  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Image` table. All the data in the column will be lost.
  - Added the required column `idElement` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_id_fkey`;

-- AlterTable
ALTER TABLE `Image` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `idElement` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idElement`, `url`);

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_idElement_fkey` FOREIGN KEY (`idElement`) REFERENCES `Imovel`(`cod_imv`) ON DELETE CASCADE ON UPDATE CASCADE;

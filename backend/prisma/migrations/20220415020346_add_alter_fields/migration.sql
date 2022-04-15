/*
  Warnings:

  - You are about to drop the column `is_Partner` on the `Corretor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Corretor` DROP COLUMN `is_Partner`,
    ADD COLUMN `score` INTEGER NOT NULL DEFAULT 0;

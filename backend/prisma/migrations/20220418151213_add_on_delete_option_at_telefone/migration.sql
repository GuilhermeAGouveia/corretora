-- DropForeignKey
ALTER TABLE `Telefone` DROP FOREIGN KEY `Telefone_pessoaId_fkey`;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

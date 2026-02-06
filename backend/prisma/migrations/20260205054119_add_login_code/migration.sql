-- AlterTable
ALTER TABLE `User` ADD COLUMN `loginCodeExpire` DATETIME(3) NULL,
    ADD COLUMN `loginCodeHash` VARCHAR(191) NULL;

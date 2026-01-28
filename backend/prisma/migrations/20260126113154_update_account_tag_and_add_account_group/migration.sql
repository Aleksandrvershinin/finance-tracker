/*
  Warnings:

  - You are about to drop the column `isVisible` on the `AccountTag` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `AccountTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `groupId` INTEGER NULL;

-- AlterTable
ALTER TABLE `AccountTag` DROP COLUMN `isVisible`,
    DROP COLUMN `order`,
    ADD COLUMN `color` VARCHAR(191) NOT NULL DEFAULT '#FFFFFF';

-- CreateTable
CREATE TABLE `AccountGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AccountGroup_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccountGroup` ADD CONSTRAINT `AccountGroup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `AccountGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

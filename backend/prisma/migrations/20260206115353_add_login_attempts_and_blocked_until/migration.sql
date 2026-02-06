-- AlterTable
ALTER TABLE `User` ADD COLUMN `loginAttempts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `loginBlockedUntil` DATETIME(3) NULL;

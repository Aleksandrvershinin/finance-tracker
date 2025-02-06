/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - A unique constraint covering the columns `[name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `balance` DOUBLE NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Account_name_key` ON `Account`(`name`);

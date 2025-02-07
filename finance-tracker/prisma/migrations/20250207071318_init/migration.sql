/*
  Warnings:

  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `amount` on the `Transfer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Transaction` MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Transfer` MODIFY `amount` DOUBLE NOT NULL;

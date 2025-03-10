/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- DropIndex
DROP INDEX `Product_name_key` ON `product`;

-- AlterTable
ALTER TABLE `product` MODIFY `price` DOUBLE NOT NULL;

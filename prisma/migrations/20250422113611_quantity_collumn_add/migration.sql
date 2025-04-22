/*
  Warnings:

  - Added the required column `quantity` to the `products_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products_orders" ADD COLUMN     "quantity" INTEGER NOT NULL;

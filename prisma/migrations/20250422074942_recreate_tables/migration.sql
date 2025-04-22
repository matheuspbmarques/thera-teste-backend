/*
  Warnings:

  - You are about to drop the column `productsOrdersId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `products_orders` table. All the data in the column will be lost.
  - Added the required column `description` to the `products_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `products_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `products_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `products_orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_productsOrdersId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "productsOrdersId";

-- AlterTable
ALTER TABLE "products_orders" DROP COLUMN "status",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products_orders" ADD CONSTRAINT "products_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

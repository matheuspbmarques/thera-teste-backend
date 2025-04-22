-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pendente', 'Concluído', 'Cancelado');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "productsOrdersId" INTEGER;

-- CreateTable
CREATE TABLE "products_orders" (
    "id" SERIAL NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "status" "Status" NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_productsOrdersId_fkey" FOREIGN KEY ("productsOrdersId") REFERENCES "products_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

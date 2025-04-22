import { Module } from "@nestjs/common";
import { OrdersController } from "src/controllers/orders.controller";
import { PrismaService } from "src/prisma.service";
import { OrdersService } from "src/services/orders.service";
import { ProductsService } from "src/services/products.service";
import { ProductsOrdersService } from "src/services/productsOrders.service";

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, PrismaService, ProductsService, ProductsOrdersService]
})
export class OrdersModule { }
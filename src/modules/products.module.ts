import { Module } from "@nestjs/common";
import { ProductsController } from "src/controllers/products.controller";
import { PrismaService } from "src/prisma.service";
import { ProductsService } from "src/services/products.service";

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, PrismaService]
})
export class ProductsModule { }
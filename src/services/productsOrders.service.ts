import { Injectable } from "@nestjs/common";
import { Orders, ProductsOrders } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { ProductsService } from "./products.service";

@Injectable()
export class ProductsOrdersService {
    constructor(private prisma: PrismaService, private productsService: ProductsService) { }

    async createMany(productsOrder: Array<Omit<ProductsOrders, 'create_at' | 'update_at'> & {
        currentStockQuantity: number
    }>) {
        for await (const productOrder of productsOrder) {
            await this.productsService.updateStocksQuantitiesByIds(productOrder.id, productOrder.currentStockQuantity - productOrder.quantity);
        };

        await this.prisma.productsOrders.createMany({
            data: productsOrder.map((productOrder): Omit<ProductsOrders, 'id'> => ({
                name: productOrder.name,
                description: productOrder.description,
                order_id: productOrder.order_id,
                quantity: productOrder.quantity,
                total: productOrder.total,
                unitPrice: productOrder.unitPrice,
                create_at: new Date(),
                update_at: new Date()
            }))
        });
    };
};
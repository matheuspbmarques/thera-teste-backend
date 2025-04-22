import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { PrismaService } from "src/prisma.service";
import { ProductsService } from "./products.service";
import { ProductOrder } from "src/interfaces/orders.interface";
import { ProductsOrdersService } from "./productsOrders.service";

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        private productsService: ProductsService,
        private productsOrders: ProductsOrdersService
    ) { }

    async create(productsOrder: Array<ProductOrder>): Promise<Prisma.OrdersCreateInput> {
        const productsWithQuantity = (await this.productsService.getByIdsToCreateOrder(productsOrder.map(product => product.id)))
            .map(product => {
                const productWithQuantity = productsOrder.find(productOrder => productOrder.id === product.id);

                if (!productWithQuantity) {
                    throw new HttpException({
                        error: 'PRODUCT-NOT-FOUND',
                        message: 'Produto não foi encontrado'
                    }, HttpStatus.NOT_FOUND);
                };

                if (product.stock_quantity < productWithQuantity.quantity) {
                    throw new HttpException({
                        error: 'PRODUCT-WITHOUT-STOCK',
                        message: `O produto ${productWithQuantity.id} não tem a quantidade de ${productWithQuantity.quantity} no estoque`
                    }, HttpStatus.CONFLICT);
                };

                return {
                    ...product,
                    quantity: productWithQuantity.quantity
                }
            });

        let orderTotal = 0;

        for await (const product of productsWithQuantity) {
            orderTotal += product.price;
        };

        const newOrder = await this.prisma.orders.create({
            data: {
                total: orderTotal,
                status: 'Pendente',
                create_at: new Date(),
                update_at: new Date()
            }
        });

        await this.productsOrders.createMany(productsWithQuantity.map(product => ({
            name: product.name,
            description: product.description,
            order_id: newOrder.id,
            unitPrice: product.price,
            total: product.price * product.quantity,
            quantity: product.quantity,
            currentStockQuantity: product.stock_quantity,
            id: product.id
        })))

        return newOrder;
    }
}
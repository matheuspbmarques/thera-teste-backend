import { Prisma } from "@prisma/client";
import { OrdersController } from "src/controllers/orders.controller";
import { CreateOrderDto } from "src/dto/orders/create.dto";
import { PrismaService } from "src/prisma.service";
import { OrdersService } from "src/services/orders.service";
import { ProductsService } from "src/services/products.service";
import { ProductsOrdersService } from "src/services/productsOrders.service";

describe('OrdersController', () => {
    let ordersController: OrdersController;
    let ordersService: OrdersService;

    beforeEach(() => {
        const prismaService: PrismaService = new PrismaService();
        const productsService: ProductsService = new ProductsService(prismaService);
        const productsOrdersService: ProductsOrdersService = new ProductsOrdersService(prismaService, productsService);
        ordersService = new OrdersService(prismaService, productsService, productsOrdersService);
        ordersController = new OrdersController(ordersService);
    });

    describe('create', () => {
        it('should call ordersService.create with correct array products', async () => {
            const createOrderDto: CreateOrderDto = {
                products: [
                    {
                        id: 1,
                        quantity: 10
                    }
                ]
            };
            const result: Prisma.OrdersCreateInput = {
                total: 100,
                status: 'Pendente',
                create_at: new Date(),
                update_at: new Date(),
            };

            jest.spyOn(ordersService, 'create').mockResolvedValue(result);

            await ordersController.create(createOrderDto);

            expect(ordersService.create).toHaveBeenCalledWith(createOrderDto.products);
        });
    });
});
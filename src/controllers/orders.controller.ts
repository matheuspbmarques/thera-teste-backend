import { Body, Controller, Post } from "@nestjs/common";
import { Products } from "generated/prisma";
import { CreateOrderDto } from "src/dto/orders/create.dto";
import { OrdersService } from "src/services/orders.service";

@Controller('orders')
export class OrdersController {
    constructor(
        private orderService: OrdersService
    ) { };

    @Post()
    async create(@Body() productsOrder: CreateOrderDto) {
        this.orderService.create(productsOrder.products)
    }
}
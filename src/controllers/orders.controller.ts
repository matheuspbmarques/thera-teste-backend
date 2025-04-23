import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { Orders, Products } from "@prisma/client";
import { CreateOrderDto } from "src/dto/orders/create.dto";
import { OrdersService } from "src/services/orders.service";

@Controller('orders')
export class OrdersController {
    constructor(
        private orderService: OrdersService
    ) { };

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({
        schema: {
            example: {
                products: [
                    {
                        id: 1,
                        quantity: 2
                    }
                ]
            } as CreateOrderDto
        }
    })
    @ApiResponse({
        schema: {
            example: {
                id: 1,
                total: 1000,
                create_at: new Date(),
                update_at: new Date(),
                status: 'Pendente'
            } as Orders
        },
        status: HttpStatus.CREATED
    })
    async create(@Body() productsOrder: CreateOrderDto) {
        this.orderService.create(productsOrder.products)
    }
}
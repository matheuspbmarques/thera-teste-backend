import { ArrayNotEmpty, IsArray } from "class-validator";
import { ProductOrder } from "src/interfaces/orders.interface";

export class CreateOrderDto {
    @IsArray()
    @ArrayNotEmpty()
    products: Array<ProductOrder>
};
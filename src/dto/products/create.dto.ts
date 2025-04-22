import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsString()
    @IsNotEmpty()
    description: string

    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    stock_quantity: number
}
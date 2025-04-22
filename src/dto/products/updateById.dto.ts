import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductByIdDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    category?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    price?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    stock_quantity?: number
};
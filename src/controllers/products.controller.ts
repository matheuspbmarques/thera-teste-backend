import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { CreateProductDto } from "src/dto/products/create.dto";
import { UpdateProductByIdDto } from "src/dto/products/updateById.dto";
import { ProductsService } from "src/services/products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() productData: CreateProductDto) {
        return await this.productsService.create(productData);
    };

    @Get()
    async getAll() {
        return await this.productsService.getAll();
    };

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() productData: UpdateProductByIdDto) {
        return await this.productsService.updateById(id, productData);
    };

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        return await this.productsService.deleteById(id);
    };
};
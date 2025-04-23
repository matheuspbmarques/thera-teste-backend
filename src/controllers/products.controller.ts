import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Products } from "@prisma/client";
import { CreateProductDto } from "src/dto/products/create.dto";
import { UpdateProductByIdDto } from "src/dto/products/updateById.dto";
import { ProductsService } from "src/services/products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Criar um novo produto' })
    @ApiBody({
        schema: {
            example: {
                name: 'Nome do Produto',
                description: 'Descrição do Produto',
                category: 'Categoria do Produto',
                price: 100,
                stock_quantity: 1000
            } as CreateProductDto
        }
    })
    @ApiResponse({
        schema: {
            example: {
                id: 1,
                name: 'Nome do Produto Criado',
                description: 'Descrição do produto criado',
                category: 'Categoria do Produto Criado',
                price: 100,
                stock_quantity: 1000,
                create_at: new Date(),
                update_at: new Date(),
            } as Products
        },
        status: 201
    })
    async create(@Body() productData: CreateProductDto) {
        return await this.productsService.create(productData);
    };

    @Get()
    @ApiOperation({ summary: 'Listar todos os produtos' })
    @ApiResponse({
        schema: {
            example: [
                {
                    id: 1,
                    name: 'Produto 1',
                    description: 'Descrição do produto 1',
                    category: 'Categoria do produto 1',
                    price: 100,
                    stock_quantity: 1000,
                    create_at: new Date(),
                    update_at: new Date()
                },
                {
                    id: 2,
                    name: 'Produto 2',
                    description: 'Descrição do produto 2',
                    category: 'Categoria do produto 2',
                    price: 50,
                    stock_quantity: 500,
                    create_at: new Date(),
                    update_at: new Date()
                },
            ] as Array<Products>
        },
        status: 200
    })
    async getAll() {
        return await this.productsService.getAll();
    };

    @Put('/:id')
    @ApiOperation({
        summary: 'Atualiza um produto existente'
    })
    @ApiBody({
        schema: {
            example: {
                name: 'Novo Nome do Produto',
                description: 'Descrição nova para o produto',
                category: 'Nova Categoria do Produto',
                price: 200,
                stock_quantity: 2000
            } as UpdateProductByIdDto,
        }
    })
    @ApiResponse({
        status: 200,
        schema: {
            example: {
                id: 1,
                name: 'Novo Nome do Produto',
                description: 'Descrição nova para o produto',
                category: 'Nova Categoria do Produto',
                price: 200,
                stock_quantity: 2000,
                create_at: new Date(),
                update_at: new Date(),
            } as Products
        }
    })
    async update(@Param('id', ParseIntPipe) id: number, @Body() productData: UpdateProductByIdDto) {
        return await this.productsService.updateById(id, productData);
    };

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        return await this.productsService.deleteById(id);
    };
};
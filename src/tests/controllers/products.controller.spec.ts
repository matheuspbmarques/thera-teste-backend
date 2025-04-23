import { ProductsService } from "src/services/products.service";
import { ProductsController } from "src/controllers/products.controller"
import { PrismaService } from "src/prisma.service";
import { Products } from "generated/prisma";
import { CreateProductDto } from "src/dto/products/create.dto";
import { UpdateProductByIdDto } from "src/dto/products/updateById.dto";

describe('ProductsController', () => {
    let productsController: ProductsController;
    let productsService: ProductsService;

    beforeEach(() => {
        const prismaService = new PrismaService();
        productsService = new ProductsService(prismaService);
        productsController = new ProductsController(productsService);
    });

    describe('create', () => {
        it('should return a product object', async () => {
            const createProductDto: CreateProductDto = {
                name: 'Product Test',
                description: 'Description from Product Test',
                category: 'Category Test',
                price: 10,
                stock_quantity: 1000
            };

            const result: Products = {
                id: 999,
                ...createProductDto,
                create_at: new Date(),
                update_at: new Date(),
            };

            jest.spyOn(productsService, 'create').mockResolvedValue(result);

            expect(await productsController.create(createProductDto)).toBe(result)
        });
    });

    describe('getAll', () => {
        it('should return an array of products', async () => {
            const result: Array<Products> = [{
                id: 1,
                name: 'Product 1',
                description: 'Description from Product 1',
                category: 'Category 1',
                price: 90,
                stock_quantity: 1000,
                create_at: new Date(),
                update_at: new Date()
            }];

            jest.spyOn(productsService, 'getAll').mockResolvedValue(result);

            expect(await productsController.getAll()).toEqual(result);
            expect(productsService.getAll).toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('should return a products object', async () => {
            const updateProductByIdDto: Required<UpdateProductByIdDto> = {
                name: 'New Product',
                description: 'Description from New Product',
                category: 'New Category',
                price: 80,
                stock_quantity: 1000
            };
            const result: Products = {
                id: 1,
                ...updateProductByIdDto,
                create_at: new Date(),
                update_at: new Date()
            };

            jest.spyOn(productsService, 'updateById').mockResolvedValue(result)

            expect(await productsController.update(1, updateProductByIdDto)).toEqual(result);
        })
    });

    describe('delete', () => {
        it ('should call productsService.deleteById with correct id', async () => {
            const id = 1;

            jest.spyOn(productsService, 'deleteById').mockResolvedValue();

            await productsController.deleteById(id);

            expect(productsService.deleteById).toHaveBeenCalledWith(id);
        });
    });
});
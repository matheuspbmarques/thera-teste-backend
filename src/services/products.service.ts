import { Injectable } from "@nestjs/common";
import { Prisma, Products } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async create({ name, category, description, price, stock_quantity }: Omit<Prisma.ProductsCreateInput, 'create_at' | 'update_at'>) {
        return await this.prisma.products.create({
            data: {
                name, category, description, price, stock_quantity,
                create_at: new Date(),
                update_at: new Date()
            }
        });
    };

    async getAll(): Promise<Array<Products>> {
        return await this.prisma.products.findMany();
    };

    async updateById(id: Products['id'], productData: Partial<Omit<Prisma.ProductsUpdateInput, 'create_at' | 'update_at'>>): Promise<Products> {
        console.log(productData);
        return await this.prisma.products.update({
            where: { id },
            data: {
                ...productData,
                update_at: new Date()
            }
        });
    };

    async deleteById(id: Products['id']): Promise<void> {
        await this.prisma.products.delete({ where: { id } });
    };

    async getByIdsToCreateOrder(ids: Array<number>): Promise<Array<Omit<Products, 'create_at' | 'update_at'>>> {
        return await this.prisma.products.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                category: true,
                stock_quantity: true
            }
        });
    };

    async updateStocksQuantitiesByIds (id: Products['id'], newStockQuantity: number): Promise<void> {
        await this.prisma.products.update({ where: { id }, data: { stock_quantity: newStockQuantity } });
    };
};
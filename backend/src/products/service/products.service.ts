import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { Product } from '../entities/products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find(); 
    }

    private isPalindrome(str: string): boolean {
        if (!str) return false;
        const cleanStr = str.toLowerCase().replace(/[\W_]/g, '');
        if (cleanStr.length < 2) return false;
        return cleanStr === cleanStr.split('').reverse().join('');
    }
    
    async search(query: string): Promise<Product[]> {
        const searchTerm = query.toLowerCase().trim();

        if (!searchTerm || searchTerm.length < 3) {
            return [];
        }

        const isPromo = this.isPalindrome(searchTerm);
        const qb = this.productRepository.createQueryBuilder('product');

        qb.where('LOWER(product.brand) LIKE :term', { term: `%${searchTerm}%` })
        .orWhere('LOWER(product.description) LIKE :term', { term: `%${searchTerm}%` });

        const products = await qb.getMany();

        if (isPromo) {
            return products.map((product) => ({
                ...product,
                discountPrice: Math.round(product.price * 0.5),
            }));
        }

        return products;
    }
}
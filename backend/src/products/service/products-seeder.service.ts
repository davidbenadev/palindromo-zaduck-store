import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/products.entity';
import { PRODUCTS_SEED_DATA } from '../data/products.data';

@Injectable()
export class ProductsSeederService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {}

    async seed() {
        const count = await this.productRepository.count();
        
        if (count === 0) {
            await this.productRepository.save(PRODUCTS_SEED_DATA);
            return 'Datos de prueba insertados exitosamente';
        }
        return 'Ya existen datos en la base de datos';
    }

    async reset() {
        await this.productRepository.clear();
        return 'Base de datos vaciada correctamente';
    }
}
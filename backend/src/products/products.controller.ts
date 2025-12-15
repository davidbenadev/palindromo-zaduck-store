import { Controller, Get, Query} from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsSeederService } from './service/products-seeder.service';
import { Product } from './entities/products.entity';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly productsSeederService: ProductsSeederService
    ) {}

    @Get()
    async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
    }

    @Get('search')
    search(@Query('q') q: any){        
    return this.productsService.search(q);
    }

    @Get('seed')
    async seed() {
    return this.productsSeederService.seed();
    }

    @Get('reset')
    async reset() {
    return this.productsSeederService.reset();
    }
}
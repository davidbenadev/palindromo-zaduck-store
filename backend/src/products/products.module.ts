import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './service/products.service';
import { ProductsSeederService } from './service/products-seeder.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsSeederService],
})
export class ProductsModule {}
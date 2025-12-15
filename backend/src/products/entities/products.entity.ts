import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column('float')
  price: number;

  discountPrice?: number;
}
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../service/products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';

const mockProducts = [
  { id: 1, brand: 'nike', description: 'zapatillas', price: 2000 },
  { id: 2, brand: 'adidas', description: 'botines', price: 1000 },
];

describe('ProductsService', () => {
  let service: ProductsService;
  let repositoryMock: any;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            createQueryBuilder: jest.fn(() => mockQueryBuilder),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repositoryMock = module.get(getRepositoryToken(Product));

    mockQueryBuilder.getMany.mockResolvedValue([...mockProducts]); 
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  // --- TEST 1: Si es Palíndromo ---
  it('debería aplicar 50% de descuento si la búsqueda es palíndromo (ej: "abba")', async () => {
    const query = 'abba';    
    const result = await service.search(query);

    expect(repositoryMock.createQueryBuilder).toHaveBeenCalled();
    
    expect(result[0]).toHaveProperty('discountPrice');
    expect(result[0].discountPrice).toBe(1000); 
    expect(result[1].discountPrice).toBe(500);  
  });

  // --- TEST 2: No es Palindromo ---
  it('NO debería aplicar descuento si NO es palíndromo (ej: "nike")', async () => {
    const query = 'nike';
    
    const result = await service.search(query);

    expect(result[0].price).toBe(2000);
    expect(result[0].discountPrice).toBeUndefined();
  });

  // --- TEST 3: Búsqueda Corta ---
  it('debería retornar array vacío si el texto es muy corto (ej: "a")', async () => {
    const query = 'a';
    
    const result = await service.search(query);
    
    expect(result).toEqual([]); 
    expect(repositoryMock.createQueryBuilder).not.toHaveBeenCalled(); 
  });

  // --- TEST 4: Palindromo Numerico ---
  it('debería buscar "101" en la descripción/marca y aplicar descuento por ser palíndromo', async () => {
    const query = '101';

    mockQueryBuilder.getMany.mockResolvedValue([
        { ...mockProducts[0], description: 'Zapatillas modelo 101' }
    ]);

    const result = await service.search(query);

    expect(result).toHaveLength(1);
    
    expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        expect.stringContaining('brand'),
        expect.anything()
    );
    expect(mockQueryBuilder.orWhere).toHaveBeenCalledWith(
        expect.stringContaining('description'),
        expect.anything()
    );

    expect(result[0].discountPrice).toBeDefined();
  });


  // --- TEST 5: Sin Resultados ---
  it('debería retornar array vacío si la base de datos no encuentra nada', async () => {
    const query = 'zapato inexistente';
    mockQueryBuilder.getMany.mockResolvedValue([]);
    const result = await service.search(query);

    expect(result).toEqual([]);
  });
});
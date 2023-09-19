import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { ProductModule } from '../product.module';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    })
    .overrideProvider(getModelToken(Product.name))
    .useValue(jest.fn())
    .compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

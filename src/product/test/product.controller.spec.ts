import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { Product } from '../schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { ProductModule } from '../product.module';
import { CreateProductDTO } from '../dto/product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule]
    })
    .overrideProvider(getModelToken(Product.name))
    .useValue(jest.fn())
    .compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  describe('getProducts', () => {
    it('when getProducts is called', async () => {
      const resultMock: Product[] = [{ name: 'TestPart' } as Product];

      jest.spyOn(service, 'getProducts').mockImplementation(async (): Promise<Product[]> => Promise.resolve(resultMock));

      const response = {
        status: (function (status) {
            this.status = status
            return this;
        }),
        json: function (body) {
            this.body = body
            return this.body;
        },
      }
      const result = await controller.getProducts(response);

      expect(result).toBe(resultMock);
      expect(result).toHaveLength(1);
    });
  });

  describe('getProduct', () => {
    it('when getProduct is called correctly', async () => {
      const resultMock: Product = {name: 'Test'} as Product;

      jest.spyOn(service, 'getProduct').mockImplementation(async (): Promise<Product> => Promise.resolve(resultMock));

      const response = {
        status: (function (status) {
            this.status = status
            return this;
        }),
        json: function (body) {
            this.body = body
            return this.body;
        },
      }
      const result = await controller.getProduct(response, '1');

      expect(result).toBe(resultMock);
    });
  });

  describe('createProduct', () => {
    it('when createProduct is called correctly', async () => {
      const resultMock: Product = {name: 'Test', description: 'test'} as Product;
      const productDTO: CreateProductDTO = new CreateProductDTO();

      jest.spyOn(service, 'createProduct').mockImplementation(async (): Promise<Product> => Promise.resolve(resultMock));

      const response = {
        status: (function (status) {
            this.status = status
            return this;
        }),
        json: function (body) {
            this.body = body
            return this.body;
        },
      }
      const result = await controller.createProduct(response, productDTO);

      expect(result).toBe(resultMock);
    });

    it('when createProduct is called without name or description', () => {

    });
  });
});


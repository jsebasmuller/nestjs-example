import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { Product } from '../schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { ProductModule } from '../product.module';
import { CreateProductDTO } from '../dto/product.dto';
import { productStub } from './stubs/product.stub';

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
      jest.spyOn(service, 'getProducts').mockImplementation(async (): Promise<Product[]> => Promise.resolve([productStub()]));

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

      expect(result).toEqual([productStub()]);
      expect(result).toHaveLength(1);
    });
  });

  describe('getProduct', () => {
    it('when getProduct is called correctly', async () => {
      jest.spyOn(service, 'getProduct').mockImplementation(async (): Promise<Product> => Promise.resolve(productStub()));

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
      const result = await controller.getProduct(response, productStub().id.toHexString());

      expect(result).toEqual(productStub());
    });
  });

  describe('createProduct', () => {
    it('when createProduct is called correctly', async () => {
      let productDTO: CreateProductDTO = {
        name: productStub().name,
        description: productStub().description
      } as CreateProductDTO;

      jest.spyOn(service, 'createProduct').mockImplementation(async (): Promise<Product> => Promise.resolve(productStub()));

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
      expect(result).toEqual(productStub());
    });
  });
});


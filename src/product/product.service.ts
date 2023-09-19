import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async getProducts(): Promise<Product[]> {
        return this.productModel.find();
    }

    async getProduct(productId: string): Promise<Product> {
        return this.productModel.findById(productId);
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const createdProduct = new this.productModel(createProductDTO);
        return createdProduct.save();
    }

    async updateProduct(productId: string, updateProductDTO: CreateProductDTO): Promise<Product> {
        return this.productModel.findByIdAndUpdate(productId, updateProductDTO, {new: true});
    }

    async deleteProduct(productId: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(productId);
    }
}

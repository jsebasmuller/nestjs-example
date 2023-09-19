import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, UseInterceptors, ParseFilePipeBuilder, UploadedFile } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get('/get-product/:productId')
    async getProduct(@Res() res, @Param('productId') productId: string) {
        let product = await this.productService.getProduct(productId);
        if (!product) {
            throw new NotFoundException('Producto no existe');
        }
        return res.status(HttpStatus.OK).json(product);
    }

    @Get('/get-products')
    async getProducts(@Res() res) {
        let products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json(products)
    }

    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        let createdProduct = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.CREATED).json(createdProduct);
    }

    @Put('/update/:productId')
    async updateProduct(@Res() res, @Param('productId') productId: string, @Body() updateProductDTO: CreateProductDTO) {
        let updatedProduct = await this.productService.updateProduct(productId, updateProductDTO);
        return res.status(HttpStatus.OK).json(updatedProduct);
    }

    @Delete('/delete/:productId')
    async deleteProduct(@Res() res, @Param('productId') productId: string) {
        let deletedProduct = await this.productService.deleteProduct(productId);
        return res.status(HttpStatus.OK).json(deletedProduct);
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post('/upload-image/:productId')
    async uploadImage(
        @Res() res,
        @UploadedFile(
            new ParseFilePipeBuilder().addFileTypeValidator({
                fileType: '.(png|jpeg|jpg)',
            }).build()
        ) file: Express.Multer.File,
        @Param('productId') productId: string
    ) {
        let product: CreateProductDTO = await this.productService.getProduct(productId) as CreateProductDTO;
        product.imageURL = file.buffer.toString('base64');
        let updatedProduct = await this.productService.updateProduct(productId, product);
        return res.status(HttpStatus.OK).json(updatedProduct);
    }
}

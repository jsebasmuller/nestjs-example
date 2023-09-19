import { Product } from "src/product/schemas/product.schema"

export const productStub = (): Product => {
    return {
        createAt: new Date(),
        description: '',
        imageURL: '',
        name: '',
        price: 0
    }
}
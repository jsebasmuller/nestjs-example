import mongoose from "mongoose"
import { Product } from "src/product/schemas/product.schema"

export const productStub = (): Product => {
    return {
        id: new mongoose.Types.ObjectId('6508e2c05d40713cd1c7d0ab'),
        createAt: new Date('2023-09-18T23:52:32.094+00:00'),
        description: 'Bateria Mapex',
        imageURL: 'https://lacolonial.com.co/cdn/shop/files/BT-PDG5254TCDR_BATERIA5PIEZAS_STANDARD_MAPEXPDG5254TCDRPRODIGYSERIES_PLATOSYSILLA_DARKRED.jpg?v=1682372473',
        name: 'Bateria',
        price: 2000000
    }
}
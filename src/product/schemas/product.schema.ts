import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({type: SchemaTypes.ObjectId})
    id: Types.ObjectId
    
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    imageURL: string;

    @Prop()
    price: number;

    @Prop({ type: Date, default: Date.now })
    createAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
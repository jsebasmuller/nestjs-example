import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({type: SchemaTypes.ObjectId})
    id: Types.ObjectId
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    @Exclude()
    password: string;

    @Prop({ type: Date, default: Date.now })
    createAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
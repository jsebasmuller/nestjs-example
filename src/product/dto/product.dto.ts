import { IsBase64, IsNotEmpty } from "class-validator";

export class CreateProductDTO {
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsBase64()
    imageURL: string;

    price: number;

    createAt: Date;
}
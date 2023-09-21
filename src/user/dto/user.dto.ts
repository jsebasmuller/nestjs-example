import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @Exclude()
    password: string;

    createAt: Date;
}
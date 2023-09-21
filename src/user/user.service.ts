import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { encryptData } from 'src/helpers/encryption.helper';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findUser(username: string): Promise<User> {
        return this.userModel.findOne({email: username});
    }

    async createUser(user: UserDTO): Promise<User> {
        user.password = encryptData(user.password);
        const createdProduct = new this.userModel(user);
        return createdProduct.save();
    }
}

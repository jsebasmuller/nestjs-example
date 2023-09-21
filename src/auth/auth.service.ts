import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { decryptData } from 'src/helpers/encryption.helper';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.userService.findUser(username);
        if (!user || password !== decryptData(user.password)) {
            throw new BadRequestException('Usuario o contraseña inválidos');
        }

        const payload = {sub: user.id, username: user.email, name: username, lastName: user.lastName};
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }

    async createUser(user: UserDTO): Promise<User>{
        return this.userService.createUser(user);
    }
}

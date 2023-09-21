import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserLogin } from 'src/user/dto/user.login';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    async signIn(@Res() res, @Body() body: UserLogin) {
        const jwt = await this.authService.signIn(body.email, body.password);
        return res.status(HttpStatus.OK).json(jwt);
    }

    @Post('create-user')
    async createUser(@Res() res, @Body() user: UserDTO){
        let createdUser = await this.authService.createUser(user);
        return res.status(HttpStatus.CREATED).json(createdUser);
    }
}

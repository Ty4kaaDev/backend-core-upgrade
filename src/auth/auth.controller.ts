import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/register')
    async register(@Body() body: RegisterDTO) {
        return this.authService.createUser(body);
    }

    @Post('/login')
    async login(@Body() body: LoginDTO) {
        return await this.authService.login(body)
    }

}

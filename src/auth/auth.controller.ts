import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RAuthDTO } from './response.dto.ts/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @ApiOkResponse({
        type: RAuthDTO,
        description: 'User created'
    })
    @ApiConflictResponse({
        description: "Email already exists",
        status: HttpStatus.CONFLICT
    })
    @ApiConflictResponse({
        description: "User already exists",
        status: HttpStatus.CONFLICT
    })
    @ApiOperation({summary: "Create new user"})
    @Post('/register')
    async register(@Body() body: RegisterDTO): Promise<RAuthDTO> {
        return this.authService.createUser(body);
    }


    @ApiOkResponse({
        type: RAuthDTO,
        description: 'User login'
    })
    @ApiNotFoundResponse({
        description: "Email invalid",
        status: HttpStatus.NOT_FOUND
    })
    @ApiConflictResponse({
        description: "Password incorrect",
        status: HttpStatus.CONFLICT
    })
    @ApiOperation({summary: "User login"})
    @Post('/login')
    async login(@Body() body: LoginDTO): Promise<RAuthDTO> {
        return await this.authService.login(body)
    }

}

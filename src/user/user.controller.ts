import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserGuard } from './guard/user.guard';
import { UserService } from './user.service';
import { UserRequest } from 'src/entity/user.entity';

@UseGuards(UserGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get('/test')
    async test(
        @Req() request: UserRequest
    ){
        return request.user
    }
}

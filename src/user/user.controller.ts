import { Controller, Get, Param, ParseArrayPipe, Query, Req, UseGuards } from '@nestjs/common';
import { UserGuard } from './guard/user.guard';
import { UserService } from './user.service';
import { UserRequest } from 'src/entity/user.entity';
import { SkipAuth } from './descorators/skip.decorator';
import { PaginationDTO } from './dto/page.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RUserDTO, RUsersDTO } from './response-dto/users.dto';

@ApiTags("user")
@UseGuards(UserGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @ApiOperation({
        summary: 'Get all users',
    })
    @ApiOkResponse({
        type: RUsersDTO
    })
    @SkipAuth()
    @Get()
    async getUsers(
        @Query() query: PaginationDTO
    ){
        return await this.userService.getUsers(query.page, query.limit)
    }

    @ApiNotFoundResponse({
        description: 'User not found',
        status: 404
    })
    @ApiOkResponse({
        type: RUserDTO
    })
    @ApiOperation({
        summary: 'Get user by id',
    })
    @SkipAuth()
    @Get('/:id')
    async getUser(
        @Param('id') id: number
    ) {
        return await this.userService.getUserById(id)
    }

    @ApiNotFoundResponse({
        description: 'User not found',
        status: 404
    })
    @ApiOkResponse({
        type: RUserDTO
    })
    @ApiOperation({
        summary: 'Get user by email',
    })
    @SkipAuth()
    @Get('/email/:email')
    async getUserByEmail(
        @Param('email') email: string
    ) {
        return await this.userService.getUserByEmail(email)
    }


}

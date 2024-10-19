import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MarketService } from './market.service';
import { UserGuard } from 'src/user/guard/user.guard';
import { ProductDTO } from './dto/product.dto';
import { UserRequest } from 'src/entity/user.entity';

@UseGuards(UserGuard)
@Controller('market')
export class MarketController {
    constructor(
        private readonly marketService: MarketService
    ) {}

    @Post('/product')
    async createProduct(
        @Body() body: ProductDTO,
        @Req() request: UserRequest
    ) {
        return await this.marketService.createProduct(request.user, body.product, body.image);
    }

    // @Post('/item')

    // @Post('/feedback/:itemId')
}

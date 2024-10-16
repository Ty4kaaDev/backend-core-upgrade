import { Controller, Get, Ip, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello( @Req() request: Request, @Ip() ip: string ): object {
        return this.appService.getData( request, ip );
    }
}

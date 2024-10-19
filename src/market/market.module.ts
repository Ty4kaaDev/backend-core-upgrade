import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { LazyModule } from 'src/lazyModule/lazy.module';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [LazyModule],
  controllers: [MarketController],
  providers: [MarketService, AuthService, UserService]
})
export class MarketModule {}

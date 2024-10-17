import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { LazyModule } from 'src/lazyModule/lazy.module';

@Module({
  imports: [
    LazyModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

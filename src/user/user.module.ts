import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { LazyModule } from 'src/lazyModule/lazy.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Module({
    imports: [
        LazyModule
    ],
    controllers: [UserController],
    providers: [UserService, AuthService],
})
export class UserModule {}

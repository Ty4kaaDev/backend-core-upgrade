import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { config } from 'process';
import { LazyModule } from './lazyModule/lazy.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow<string>('HOST_DB'),
                port: configService.getOrThrow<number>('PORT_DB'),
                username: 'postgres',
                password: configService.get<string>('PASSWORD_DB'),
                database: configService.getOrThrow<string>('DATABASE_DB'),
                entities: [join(process.cwd(), 'dist/**/*.entity.js')],
                synchronize: true,
            }),
        }),
        LazyModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private database: DataSource) {}
}


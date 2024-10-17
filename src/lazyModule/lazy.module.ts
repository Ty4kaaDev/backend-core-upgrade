import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async ( configService: ConfigService ) => ( {
                global: true,
                secret: configService.get< string >( 'JWT_TOKEN' ),
                signOptions: {
                    expiresIn: configService.get< string >( 'JWT_EXPIRES' ),
                },
            } ),
            inject: [ ConfigService ],
        })
    ],
    exports: [ JwtModule, TypeOrmModule ]
})

export class LazyModule {}
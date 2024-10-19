import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { Feedback } from "src/entity/feedback.entity";
import { Item } from "src/entity/item.entity";
import { Product } from "src/entity/product.entity";
import { User } from "src/entity/user.entity";
import { UserService } from "src/user/user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Feedback, Item, Product]),
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
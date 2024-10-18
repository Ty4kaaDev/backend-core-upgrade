import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserJwt, UserRole } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RAuthDTO } from './response.dto.ts/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ){}

    async authByJwt(jwt: UserJwt): Promise<User>{
        const user = await this.userRepository.findOne({
            where: {
                id: jwt.sub
            }
        })

        if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return user
    }

    async getTokenWithUser(user: User) {
        return await this.jwtService.signAsync({
            sub: user.id,
            iss: 'user'
        })
    }

    async login(
        dto: LoginDTO
    ): Promise<RAuthDTO>{
        const {password, email} = dto;

        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        if(!user) throw new HttpException( "invalid email", HttpStatus.NOT_FOUND);
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) throw new HttpException('Password incorrect', HttpStatus.CONFLICT);
        
        return {
            user: this.userService.prepareUser(user),
            token: await this.getTokenWithUser(user)
        }
    }

    async createUser(
        dto: RegisterDTO
    ): Promise<RAuthDTO>{
        if(await this.userRepository.findOne({ where: { email: dto.email } })) throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        const hashedPassword = await bcrypt.hash( dto.password, await bcrypt.genSalt( 10 ) );
        const req = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: UserRole.USER,
            password: hashedPassword,
            email: dto.email,
        }
        
        const user = await this.userRepository.save(req);
        if(!user) throw new HttpException('User already exists', HttpStatus.CONFLICT);
        return {
            user: this.userService.prepareUser(user),
            token: await this.getTokenWithUser(user)
        }
    }
}

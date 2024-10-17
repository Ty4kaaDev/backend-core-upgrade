import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserJwt, UserRole } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
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
    ){
        const {password, email} = dto;

        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        if(!user) throw new Error('User not found');
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) throw new Error('Password incorrect');
        
        return {
            user: user,
            token: await this.getTokenWithUser(user)
        }
    }

    async createUser(
        dto: RegisterDTO
    ){

        const hashedPassword = await bcrypt.hash( dto.password, await bcrypt.genSalt( 10 ) );
        const user = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: UserRole.USER,
            password: hashedPassword,
            email: dto.email,
        }
        
        let res = await this.userRepository.save(user);
        
        return res
    }
}

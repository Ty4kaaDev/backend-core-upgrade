import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

    async createUser(
        dto: CreateUserDTO
    ){

        const hashedPassword = await bcrypt.hash( dto.password, await bcrypt.genSalt( 10 ) );
        const user = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: UserRole.USER,
            password: hashedPassword,
            email: dto.email,
        }
        await this.userRepository.save(user);
        let res = await this.userRepository.find();
        
        return res
    }
}

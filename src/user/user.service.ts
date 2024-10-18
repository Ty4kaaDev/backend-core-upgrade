import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { RUserDTO, RUsersDTO } from './response-dto/users.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async getUsers(
        page: number, limit: number
    ): Promise<RUsersDTO>{
        const count = await this.userRepository.count();
        const users = await this.userRepository.find({
            take: limit,
            skip: (page - 1) * limit
        })

        return {
            pages: Math.ceil(count / limit),
            users: users.map(user => this.prepareUser(user))
        }
    }

    async getUserById(id: number): Promise<RUserDTO> {
        const user = await this.userRepository.findOne({ where: { id } })
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return this.prepareUser(user)
    }

    async getUserModelById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } })
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return user;
    }

    async getUserByEmail(email: string): Promise<RUserDTO> {
        const user = await this.userRepository.findOne({ where: { email } })
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return this.prepareUser(user);
    }

    async getUsersWithRole(role: UserRole): Promise<RUserDTO[]> {
        return (await this.userRepository.find({ where: { role } })).map(user => this.prepareUser(user))
    }

    prepareUser(user: User): RUserDTO {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email
        }
    }
}

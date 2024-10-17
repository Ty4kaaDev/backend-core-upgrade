import { UserService } from 'src/user/user.service';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    BAN = 0,
    USER = 1,
}

export interface UserJwt {
    sub: number;
    iat: number;
    exp: number;
}

export interface UserRequest extends Request {
    user: User;
    jwtPayload: UserJwt;
    token: string;
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    enable2FA: boolean;

    @Column()
    role: UserRole;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string
}

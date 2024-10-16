import { UserService } from 'src/user/user.service';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    BAN = 0,
    USER = 1,
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

    @Column()
    email: string
}

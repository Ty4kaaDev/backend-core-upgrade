import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Product extends Base {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    image: string | null

    @Column()
    product: string
    
    @ManyToOne(() => User)
    @JoinTable({name: "user_id"})
    author: User
}
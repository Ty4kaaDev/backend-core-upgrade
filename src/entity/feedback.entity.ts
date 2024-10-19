import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Base } from "./base.entity";
import { Item } from "./item.entity";

@Entity()
export class Feedback extends Base {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column()
    comment: string;

    @Column()
    rating: number;

    @ManyToOne(() => Item, item => item.feedbacks)
    @JoinColumn({ name: 'item_id' })
    item: Item;

}
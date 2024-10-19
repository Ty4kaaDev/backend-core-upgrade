import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Feedback } from "./feedback.entity";
import { Base } from "./base.entity";

@Entity()
export class Item extends Base { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @OneToMany(() => Feedback, feedback => feedback.item)
    feedbacks: Array<Feedback>;
}
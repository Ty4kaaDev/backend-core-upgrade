import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

export abstract class Base {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
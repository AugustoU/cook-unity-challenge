import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chef{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guid: string

    @Column()
    name: string
}
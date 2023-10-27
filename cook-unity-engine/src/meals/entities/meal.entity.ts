import User from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meal{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imageLink: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.meals)
    owner: User
}
import { MealRating } from "src/meal-ratings/entities/meal-rating.entity";
import User from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => MealRating, (rating) => rating.meal)
    ratings: MealRating[];
}
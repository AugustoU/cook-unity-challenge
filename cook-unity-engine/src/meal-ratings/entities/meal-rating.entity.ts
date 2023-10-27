import { Meal } from "src/meals/entities/meal.entity";
import User from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class MealRating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    rating: number;

    @ManyToOne(() => User, user => user.ratings)
    customer: User;
  
    @ManyToOne(() => Meal, meal => meal.ratings)
    meal: Meal;
}
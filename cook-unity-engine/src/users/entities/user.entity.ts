import { Exclude } from "class-transformer";
import { UserRole } from "../enums/roles.enum";
import { MealRating } from "../../meal-ratings/entities/meal-rating.entity";
import { Meal } from "../../meals/entities/meal.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ unique: true })
  @Exclude()
  email: string;
 
  @Column()
  name: string;
 
  @Column()
  @Exclude()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  @Exclude()
  role: UserRole;

  
  @OneToMany(() => Meal, (meal) => meal.owner)
  meals: Meal[]

  @OneToMany(() => MealRating, (mealRating) => mealRating.customer)
  ratings: MealRating
}
 
export default User;
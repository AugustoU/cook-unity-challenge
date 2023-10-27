import { UserRole } from "src/auth/roles.enum";
import { Meal } from "src/meals/entities/meal.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ unique: true })
  email: string;
 
  @Column()
  name: string;
 
  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  
  @OneToMany(() => Meal, (meal) => meal.owner)
  meals: Meal[]
}
 
export default User;
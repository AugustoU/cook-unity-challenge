import { UserRole } from "src/auth/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column({ unique: true })
  public email: string;
 
  @Column()
  public name: string;
 
  @Column()
  public password: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  public role: UserRole;
}
 
export default User;
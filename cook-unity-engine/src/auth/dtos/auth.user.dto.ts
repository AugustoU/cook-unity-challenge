import { UserRole } from "src/users/enums/roles.enum";

export interface AuthUserDto{
  id: number; 
  email: string;
  name: string;
  role: UserRole;
}
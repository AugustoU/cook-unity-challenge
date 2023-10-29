import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/users/enums/roles.enum";

export class AuthUserDto{
  @ApiProperty()
  id: number; 
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  role: UserRole;
}
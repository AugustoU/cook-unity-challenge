import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
import { UserRole } from '../roles.enum';

export class AuthRegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: string;

  password: string;

}
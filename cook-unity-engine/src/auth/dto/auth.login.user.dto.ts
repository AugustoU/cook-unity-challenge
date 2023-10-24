import { IsEmail, Matches } from "class-validator";

export class AuthLoginUserDto {
  @IsEmail()
  email: string;

  password: string;
}
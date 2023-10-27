import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class AuthLoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;
}

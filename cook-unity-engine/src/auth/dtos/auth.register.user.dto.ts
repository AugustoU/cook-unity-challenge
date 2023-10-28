
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../common/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

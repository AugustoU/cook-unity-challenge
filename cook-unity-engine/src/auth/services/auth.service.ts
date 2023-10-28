import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterUserDto } from '../dtos/auth.register.user.dto';
import * as bcrypt from 'bcrypt';
import { AuthLoginUserDto } from '../dtos/auth.login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { AuthUserDto } from '../dtos/auth.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  public async registerUser(authRegisterUserDto: AuthRegisterUserDto) 
  : Promise<AuthUserDto> {
    const hashedPassword = await bcrypt.hash(authRegisterUserDto.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...authRegisterUserDto,
        password: hashedPassword
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async authenticateUser(authLoginUserDto: AuthLoginUserDto) : Promise<{access_token:string}> {

    const user = await this.usersService.getByEmail(authLoginUserDto.email);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatching = await bcrypt.compare(
      authLoginUserDto.password,
      user.password
    );

    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }

    const payload = { sub: user.id, name: user.name, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

}

import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthRegisterUserDto } from './dto/auth.register.user.dto';
import { AuthLoginUserDto } from './dto/auth.login.user.dto';
import { AuthService } from './auth.service';
import { CognitoExceptionFilter } from './cognito.exception.filter';

@Controller('auth')
@UseFilters(CognitoExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @Post('/register')
  async register(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    return await this.authService.registerUser(authRegisterUserDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return await this.authService.authenticateUser(authLoginUserDto);
  }
}

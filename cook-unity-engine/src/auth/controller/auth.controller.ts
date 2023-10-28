import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthRegisterUserDto } from '../dtos/auth.register.user.dto';
import { AuthLoginUserDto } from '../dtos/auth.login.user.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
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

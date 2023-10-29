import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthRegisterUserDto } from '../dtos/auth.register.user.dto';
import { AuthLoginUserDto } from '../dtos/auth.login.user.dto';
import { AuthService } from '../services/auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from '../dtos/auth.user.dto';
import { AccessTokenDto } from '../dtos/access-token.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
 
    @Post('/register')
    @ApiOkResponse({type: AuthUserDto})
    async register(@Body() authRegisterUserDto: AuthRegisterUserDto)
    :Promise<AuthUserDto> {
      return await this.authService.registerUser(authRegisterUserDto);
    }
  
    @Post('/login')
    @ApiOkResponse({type: AccessTokenDto })
    async login(@Body() authLoginUserDto: AuthLoginUserDto)
    :Promise<AccessTokenDto> {
      return await this.authService.authenticateUser(authLoginUserDto);
    }

}

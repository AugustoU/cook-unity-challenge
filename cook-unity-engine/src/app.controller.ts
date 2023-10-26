import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './auth/role.decorator';
import { UserRole } from './auth/roles.enum';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Roles(UserRole.CHEF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getHello(): string {

    return "Prueba";
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/role.decorator';
import { UserRole } from './auth/roles.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(UserRole.CUSTOMER)
  @UseGuards(JwtGuard, RolesGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}

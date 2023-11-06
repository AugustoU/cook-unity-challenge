import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/enums/roles.enum';
import { UsersService } from 'src/users/services/users.service';
import { ChefDto } from '../dtos/chef.dto';
import { Roles } from 'src/auth/role.decorator';
import { SeachChefsDto } from '../dtos/search-chefs.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('chefs')
@ApiBearerAuth()
@ApiTags('chefs')
@UseGuards(JwtGuard)
export class ChefsController {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Get()
    @ApiResponseProperty({type:ChefDto})
    @UseGuards(RolesGuard)
    @Roles(UserRole.CUSTOMER)
    async getWhenNameStartsWith(@Query() searchChefsDto: SeachChefsDto) 
    : Promise<ChefDto[]> {
        return await this.usersService.getWhenNameStartsWith(searchChefsDto.nameStartsWith, UserRole.CHEF);
    }
}

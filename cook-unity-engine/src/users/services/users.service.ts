import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import CreateUserDto from '../dtos/createUser.dto';
import { UserRole } from '../enums/roles.enum';
import { ChefDto } from 'src/chefs/dtos/chef.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async getWhenNameStartsWith(startingString: string, role: UserRole): Promise<ChefDto[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.name LIKE :startingString', { startingString: `${startingString}%` })
      .andWhere('user.role = :role', { role })
      .getMany();
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async getById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
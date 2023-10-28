import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import CreateUserDto from '../dtos/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>
    ) {}
   
    async getByEmail(email: string) : Promise<User> {
      const user = await this.usersRepository.findOneBy({ email });
      if (user) {
        return user;
      }
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async getById(id: number) : Promise<User> {
      const user = await this.usersRepository.findOneBy({ id });
      if (user) {
        return user;
      }
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
   
    async create(userData: CreateUserDto) : Promise<User> {
      const newUser = this.usersRepository.create(userData);
      await this.usersRepository.save(newUser);
      return newUser;
    }
  }
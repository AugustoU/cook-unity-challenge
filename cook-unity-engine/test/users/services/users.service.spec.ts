import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../../../src/users/services/users.service';
import User from '../../../src/users/entities/user.entity';
import CreateUserDto from '../../../src/users/dtos/createUser.dto';


describe('UsersService', () => {
  let usersService: UsersService;

  const mockUsersRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('getByEmail', () => {
    it('should return a user if found', async () => {
      const mockUser = { id: 1, email: 'test@example.com' } as User;
      mockUsersRepository.findOneBy.mockReturnValue(mockUser);

      const result = await usersService.getByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('should throw an exception if user not found', async () => {
      mockUsersRepository.findOneBy.mockReturnValue(undefined);

      await expect(usersService.getByEmail('nonexistent@example.com')).rejects.toThrowError(
        new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('getById', () => {
    it('should return a user if found', async () => {
      const mockUser = { id: 1, email: 'test@example.com' } as User;
      mockUsersRepository.findOneBy.mockReturnValue(mockUser);

      const result = await usersService.getById(1);

      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw an exception if user not found', async () => {
      mockUsersRepository.findOneBy.mockReturnValue(undefined);

      await expect(usersService.getById(999)).rejects.toThrowError(
        new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'newuser@example.com',
        name: 'newuser',
        password: 'password'
      };

      const mockNewUser = { id: 2, ...createUserDto } as User;
      mockUsersRepository.create.mockReturnValue(mockNewUser);

      const result = await usersService.create(createUserDto);

      expect(result).toEqual(mockNewUser);
      expect(mockUsersRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUsersRepository.save).toHaveBeenCalledWith(mockNewUser);
    });
  });
});

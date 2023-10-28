import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../../src/auth/services/auth.service';
import { AuthRegisterUserDto } from '../../../src/auth/dtos/auth.register.user.dto';
import { UsersService } from '../../../src/users/services/users.service';




describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            getByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a user and return the created user', async () => {

      // Arrange
      const authRegisterUserDto : AuthRegisterUserDto  = {
        name: 'test',
        role: 'chef',
        email: 'test@example.com',
        password: 'password123',
      };

      const createdUser = {
        id: 1,
        email: authRegisterUserDto.email,
      };

      usersService.create = jest.fn().mockResolvedValue(createdUser);


      // Act
      const result = await authService.registerUser(authRegisterUserDto);


      // Assert
      expect(result).toEqual(createdUser);
    });

    it('should handle unique constraint violation and throw BAD_REQUEST exception', async () => {

      // Arrange
      const authRegisterUserDto : AuthRegisterUserDto  = {
        name: 'test',
        role: 'chef',
        email: 'test@example.com',
        password: 'password123',
      };

      usersService.create = jest.fn().mockRejectedValue({
        code: '23505', 
      });
      
      // Act
      const result = authService.registerUser(authRegisterUserDto);
      
      // Assert
      await expect(result).rejects.toThrowError(
        new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST),
      );
    });

    it('should handle other errors and throw INTERNAL_SERVER_ERROR exception', async () => {

      // Arrange
      const authRegisterUserDto : AuthRegisterUserDto  = {
        name: 'test',
        role: 'chef',
        email: 'test@example.com',
        password: 'password123',
      };

      usersService.create = jest.fn().mockRejectedValue(new Error('Some database error'));

      // Act
      const result = authService.registerUser(authRegisterUserDto);

      // Assert
      await expect(result).rejects.toThrowError(
        new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });

  describe('authenticateUser', () => {
    it('should authenticate a user and return an access token', async () => {

      // Arrange
      const authLoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = {
        id: 1,
        name: 'Test User',
        email: authLoginUserDto.email,
        password: await bcrypt.hash('password123', 10),
        role: 'user',
      };

      usersService.getByEmail = jest.fn().mockResolvedValue(user);
      jwtService.signAsync = jest.fn().mockResolvedValue('fakeAccessToken');


      // Act
      const result = await authService.authenticateUser(authLoginUserDto);

      // Arrange
      expect(result).toEqual({
        access_token: 'fakeAccessToken',
      });
    });

    it('should handle invalid credentials and throw BAD_REQUEST exception', async () => {

      // Arrange
      const authLoginUserDto = {
        email: 'nonexistent@example.com',
        password: 'invalidpassword',
      };

      usersService.getByEmail = jest.fn().mockResolvedValue(null);


      // Act
      const result = authService.authenticateUser(authLoginUserDto);
      
      // Assert
      await expect(result).rejects.toThrowError(
        new HttpException('User does not exist', HttpStatus.BAD_REQUEST),
      );
    });

    it('should handle wrong password and throw BAD_REQUEST exception', async () => {

      // Arrange
      const authLoginUserDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const user = {
        id: 1,
        name: 'Test User',
        email: authLoginUserDto.email,
        password: await bcrypt.hash('password123', 10),
        role: 'user',
      };

      usersService.getByEmail = jest.fn().mockResolvedValue(user);

      // Act
      const result = authService.authenticateUser(authLoginUserDto);
      
      // Assert
      await expect(result).rejects.toThrowError(
        new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST),
      );
    });
  });
});

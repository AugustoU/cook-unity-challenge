import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chef } from 'src/chef/entities/chef.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy,
  ],
  imports:[ 
    PassportModule,
    TypeOrmModule.forFeature([Chef])
  ]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ChefsController } from './controller/chefs.controller';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[UsersModule],
  controllers: [ChefsController],
})
export class ChefsModule {}

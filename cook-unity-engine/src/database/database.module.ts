import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chef } from 'src/chef/entities/chef.entity';


@Module({
    imports:[
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: 5432,
            password: process.env.POSTGRES_PASSWORD,
            username: process.env.POSTGRES_USER,
            entities: [Chef],
            database: process.env.POSTGRES_DB,
            synchronize: true,
          }),
    ]
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortenerModule } from './shortener/shortener.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { shorteners } from './shortener/shortener.model';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { users } from './users/users.model';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'shortener',
      models: [shorteners, users],
    }),
    ShortenerModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

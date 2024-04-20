import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinsModule } from './coins/coins.module';
import { Web3Module } from './web3/web3.module';
import { ScannerApiModule } from './scanner-api/scanner-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_USER_HOST,
      username: process.env.DB_USER_NAME,
      password: '',
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    Web3Module,
    UsersModule,
    CoinsModule,
    ScannerApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

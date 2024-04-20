import { Module } from '@nestjs/common';
import { CoinsController } from './coins.controller';
import { CoinsService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from './coin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coin]),
  ],
  controllers: [CoinsController],
  providers: [CoinsService]
})
export class CoinsModule {}

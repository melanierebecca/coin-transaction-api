import { Module } from '@nestjs/common';
import { CoinsController } from './coins.controller';
import { CoinsService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from './coin.entity';
import { ScannerApiModule } from '../scanner-api/scanner-api.module';
import { Web3Module } from 'src/web3/web3.module';

@Module({
  imports: [
    ScannerApiModule,
    Web3Module,
    TypeOrmModule.forFeature([Coin]),
  ],
  controllers: [CoinsController],
  providers: [CoinsService],
  exports: [CoinsService]
})
export class CoinsModule {}

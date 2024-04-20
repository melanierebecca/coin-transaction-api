import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
  ],
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule {}

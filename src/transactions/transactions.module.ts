import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Web3Module } from 'src/web3/web3.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { CoinsModule } from 'src/coins/coins.module';

@Module({
  imports: [
    Web3Module,
    WalletModule,
    CoinsModule,
    TypeOrmModule.forFeature([Transaction]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}

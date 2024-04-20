import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TokenTransferDTO } from './dto/post-transaction.dto';
import { Web3Service } from 'src/web3/web3.service';
import { UsersService } from 'src/users/users.service';
import { WalletService } from 'src/wallet/wallet.service';
import { CoinsService } from 'src/coins/coin.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private web3Service: Web3Service,
    private walletService: WalletService,
    private coinService: CoinsService,
  ) {}

  async transferTokens(data: TokenTransferDTO): Promise<any> {
    console.log(data);
    const userWallet = await this.walletService.findByUserId(data.user);
    const coin = await this.coinService.findOne(data.coin);
    console.log(userWallet);
    const txn = await this.web3Service.transferTokens({
      pk: userWallet.privateKey,
      from: userWallet.address,
      to: data.toAddress,
      amount: data.amount,
      tokenAbi: coin.abi,
      tokenAddress: coin.address,
    });
    // const newTxn = this.transactionRepository.create(data);
    // return await this.transactionRepository.save(newTxn);
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  findOne(id: number): Promise<Transaction | null> {
    return this.transactionRepository.findOneBy({ id });
  }
}

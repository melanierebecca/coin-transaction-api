import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from './coin.entity';
import { AddCoinDto } from './dto/add-coin.dto';
import { ScannerApiService } from 'src/scanner-api/scanner-api.service';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(Coin)
    private coinRepository: Repository<Coin>,
    private scannerAPIService: ScannerApiService,
    private web3Service: Web3Service,
  ) {}

  async create(coinData: Partial<Coin>): Promise<any> {
    const abi  = await this.scannerAPIService.getTokenAbi(coinData.address)
    console.log(abi)
    if(abi) {
      const data = await this.web3Service.getTokenDetails({abi: abi, coinAddress: coinData.address})
      console.log(data)
      const newCoin = this.coinRepository.create(data);
      const saved = await this.coinRepository.save(newCoin);
      console.log(saved)
      return saved
    }
  }

  findAll(): Promise<Coin[]> {
    return this.coinRepository.find();
  }

  async findOne(id: number): Promise<Coin | null> {
    const coin = await this.coinRepository.findOneBy({id});
    if (!coin) {
      throw new NotFoundException(`Coin with ID ${id} not found`);
    }
    return coin;
  }

  async findByAddress(address: string): Promise<Coin | null> {
    return this.coinRepository.findOneBy({ address: address });
  }

  async findOneAndUpdate(id: number, data: AddCoinDto): Promise<Coin | null> {
    const coin = await this.findOne(id);
    if (!coin) {
      throw new NotFoundException(`Coin with ID ${id} not found`)
    }
    // Update properties of coin entity with provided data
    Object.assign(coin, data);
    return await this.coinRepository.save(coin);
  }

  async remove(id: number): Promise<void> {
    const result = await this.coinRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Coin with ID ${id} not found`);
    }
  }
}

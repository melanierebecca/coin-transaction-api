import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from './coin.entity';
import { AddCoinDto } from './dto/add-coin.dto';

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(Coin)
    private coinRepository: Repository<Coin>,
  ) {}

  async create(userData: Partial<Coin>): Promise<Coin> {
    const newCoin = this.coinRepository.create(userData);
    return await this.coinRepository.save(newCoin);
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

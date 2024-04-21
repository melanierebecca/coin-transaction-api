import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    try {
      const newUser = this.usersRepository.create(userData);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
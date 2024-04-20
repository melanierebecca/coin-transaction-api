import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  name: string;

  @Column()
  decimals: string;

  @Column()
  symbol: string;

  @Column({ type: 'text' })
  abi: string;
}
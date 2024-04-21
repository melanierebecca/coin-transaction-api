import { Wallet } from 'src/wallet/wallet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Wallet, wallet => wallet.id)
  @JoinColumn()
  wallet: Wallet;
}
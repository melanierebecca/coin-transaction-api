import { Coin } from 'src/coins/coin.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  amount: string;

  @Column({unique: true})
  txhash: string;

//   @ManyToOne(() => User, user => user.id)
//   sender: User;

//   @ManyToOne(() => User, user => user.id)
//   receiver: User;

  @ManyToOne(() => Coin, coin => coin.id)
  coin: Coin;
}
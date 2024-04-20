 import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  mnemonic: string;

  @Column()
  privateKey: string;

  @Column()
  xpub: string;

//   @OneToOne(() => user => user.wallet)
//   user: User;
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { WalletService } from 'src/wallet/wallet.service';
const saltRoundForPassword = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private walletService: WalletService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<any> {
    const salt = bcrypt.genSaltSync(saltRoundForPassword);
    const password = bcrypt.hashSync(data.password, salt);
    const wallet = await this.walletService.create();
    console.log(wallet);
    const user = await this.usersService.create({
      ...data,
      password: password,
      wallet: wallet,
      address: wallet.address,
    });
    return {
      username: user.username,
    };
  }

  async signIn(data: SignInDto): Promise<any> {
    const user = await this.usersService.findByUsername(data.username);
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      wallet: user.wallet,
      address: user.address,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

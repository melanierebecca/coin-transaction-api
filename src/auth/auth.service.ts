import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/register-user.dto";
import * as bcrypt from "bcrypt";
import { SignInDto } from "./dto/sign-in.dto";
const saltRoundForPassword = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(data: CreateUserDto): Promise<any> {
    const salt = bcrypt.genSaltSync(saltRoundForPassword);
    const password = bcrypt.hashSync(data.password, salt);
    const user = await this.usersService.create({...data, password: password});
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
    const payload = {id:user.id, username: user.username, email: user.email};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { SignUpDto } from "src/auth/dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("register")
  signUp(@Body() SignUpDto: SignUpDto) {
    return this.authService.signUp(SignUpDto);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}

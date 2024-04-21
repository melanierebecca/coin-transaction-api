import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({ example: "john_doe" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "john_doe" })
  @IsString()
  @IsNotEmpty()
  password: string;

}

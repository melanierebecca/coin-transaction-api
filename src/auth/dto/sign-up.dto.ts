import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
  @ApiProperty({ example: "john_doe" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "John Doe" })
  name: string;

  @ApiProperty({ example: "john_doe" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "john@gmail.com" })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

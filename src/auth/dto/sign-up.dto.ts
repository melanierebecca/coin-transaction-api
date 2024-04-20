import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SignUpDto {
  @ApiProperty({ example: "john_doe" })
  username: string;

  @ApiProperty({ example: "John Doe" })
  name: string;

  @ApiProperty({ example: "john_doe" })
  password: string;

  @ApiProperty({ example: "john@gmail.com" })
  @IsEmail()
  email: string;
}

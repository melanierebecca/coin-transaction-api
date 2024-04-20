import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({ example: "john_doe" })
  username: string;

  @ApiProperty({ example: "john_doe" })
  password: string;

}

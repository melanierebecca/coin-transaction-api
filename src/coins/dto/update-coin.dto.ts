import { ApiProperty } from "@nestjs/swagger";

export class UpdateCoinDto {
  @ApiProperty({ example: "0xdac17f958d2ee523a2206206994597c13d831ec7" })
  address: string;

  @ApiProperty({ example: "USDT" })
  name: string;

}

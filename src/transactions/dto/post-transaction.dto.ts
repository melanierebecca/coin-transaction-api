import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TokenTransferBodyDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  coin: number;

  @ApiProperty({ example: "1" })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({ example: "0x....." })
  @IsString()
  @IsNotEmpty()
  toAddress: string;
}

export class TokenTransferDTO {
  @ApiProperty({ example: '0x.....' })
  fromAddress: string

  @ApiProperty({ example: 1 })
  toAddress: string

  @ApiProperty({ example: 1 })
  coin: number

  @ApiProperty({ example: 1 })
  amount: string

}
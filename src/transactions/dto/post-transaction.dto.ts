import { ApiProperty } from "@nestjs/swagger";

export class TokenTransferBodyDTO {
  @ApiProperty({ example: 1 })
  coin: number

  @ApiProperty({ example: 1 })
  amount: string

  @ApiProperty({ example: 1 })
  toAddress: string

}

export class TokenTransferDTO {
  @ApiProperty({ example: 1 })
  user: number

  @ApiProperty({ example: 1 })
  toAddress: string

  @ApiProperty({ example: 1 })
  coin: number

  @ApiProperty({ example: 1 })
  amount: string

}
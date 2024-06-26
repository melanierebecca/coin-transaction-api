import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { TokenTransferBodyDTO, TokenTransferDTO } from './dto/post-transaction.dto';
import { TransactionsService } from './transactions.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('transactions')
@ApiTags('transactions')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('token-transfer')
  create(@Request() req, @Body() body: TokenTransferBodyDTO) {
    return this.transactionService.transferTokens({...body, fromAddress: req.user.address});
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionService.findOne(id);
  }
}

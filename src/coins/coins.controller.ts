import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoinsService } from './coin.service';
import { AddCoinDto } from './dto/add-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('coins')
@ApiTags('coins')
@ApiBearerAuth()
export class CoinsController {

constructor(private readonly coinsService: CoinsService) {}

  @Post()
  create(@Body() createCoinDto: AddCoinDto) {
    return this.coinsService.create(createCoinDto);
  }

  @Get()
  findAll() {
    return this.coinsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coinsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoinDto: UpdateCoinDto) {
    return this.coinsService.findOneAndUpdate(id, updateCoinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coinsService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BonusGarcomService } from './bonus-garcom.service';
import { CreateBonusGarcomDto } from './dto/create-bonus-garcom.dto';
import { UpdateBonusGarcomDto } from './dto/update-bonus-garcom.dto';

@Controller('bonusGarcom')
export class BonusGarcomController {
  constructor(private readonly bonusGarcomService: BonusGarcomService) {}

  @Post()
  create(@Body() createBonusGarcomDto: CreateBonusGarcomDto[]) {
    return this.bonusGarcomService.create(createBonusGarcomDto);
  }

  @Get()
  findAll() {
    return this.bonusGarcomService.findAll();
  }
  @Get('gettudo')
  findGeral() {
    return this.bonusGarcomService.findGeral();
  }
  @Get('gettudopordata/:inicio/:fim')
  findGeralPorData(@Param('inicio') inicio: string, @Param('fim') fim: string) {
    return this.bonusGarcomService.findGeralPorData(inicio,fim);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bonusGarcomService.findOne(id);
  }

  @Patch('atualiza/:id')
  update(@Param('id') id: number, @Body() updateBonusGarcomDto: UpdateBonusGarcomDto) {
    return this.bonusGarcomService.update(id, updateBonusGarcomDto);
  }

  @Delete('deletar/:id')
  remove(@Param('id') id: number) {
    return this.bonusGarcomService.delete(id);
  }
}

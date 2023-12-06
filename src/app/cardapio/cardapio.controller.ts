import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { CreateCardapioDto } from './dto/create-cardapio.dto';
import { UpdateCardapioDto } from './dto/update-cardapio.dto';

@Controller('cardapio')
export class CardapioController {
  constructor(private readonly cardapioService: CardapioService) {}

  @Post()
  create(@Body() createCardapioDto: CreateCardapioDto) {
    return this.cardapioService.create(createCardapioDto);
  }

  @Get()
  findAll() {
    return this.cardapioService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cardapioService.findOne(id);
  }

  @Patch('atualiza/:id')
  update(@Param('id') id: number, @Body() updateCardapioDto: UpdateCardapioDto) {
    return this.cardapioService.update(id, updateCardapioDto);
  }
  @Patch('atualiza-status/:id/:status')
  updateStatus(@Param('id') id: number, @Param('status')status: boolean) {
    return this.cardapioService.updateStatus(id, status);
  }

  @Delete('deletar/:id')
  remove(@Param('id') id: number) {
    return this.cardapioService.delete(id);
  }
}

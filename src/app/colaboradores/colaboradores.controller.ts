/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ColaboradoresService } from './colaboradores.service'
import { CreateColaboradoreDto } from './dto/create-colaboradore.dto'
import { UpdateColaboradoreDto } from './dto/update-colaboradore.dto'

@Controller('colaboradores')
export class ColaboradoresController {
  constructor(private readonly colaboradoresService: ColaboradoresService) { }

  @Post()
  create(@Body() createColaboradoreDto: CreateColaboradoreDto) {
    return this.colaboradoresService.create(createColaboradoreDto)
  }

  @Get()
  findAll() {
    return this.colaboradoresService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colaboradoresService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColaboradoreDto: UpdateColaboradoreDto) {
    return this.colaboradoresService.update(+id, updateColaboradoreDto)
  }

  @Patch('atualiza-status/:id/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: boolean) {
    return this.colaboradoresService.updateStatus(+id, status)
  }

  @Patch('atualiza-chefia/:id/:chefia')
  updateChefia(@Param('id') id: string, @Param('chefia') chefia: boolean) {
    return this.colaboradoresService.updateChefia(+id, chefia)
  }

  @Patch('atualiza-acesso/:id/:acesso')
  updateAcesso(@Param('id') id: string, @Param('acesso') acesso: boolean) {
    return this.colaboradoresService.updateAcesso(+id, acesso)
  }

  @Patch('atualiza/:id')
  upColaborador(
    @Param('id') id: string, 
    @Body() updateColaboradoreDto: UpdateColaboradoreDto
    ) {
    return this.colaboradoresService.upColaborador(+id, updateColaboradoreDto)
  }
}

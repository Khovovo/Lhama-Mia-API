import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(@Body() createMesaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createMesaDto);
  }

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriaService.findOne(id);
  }

  @Patch('atualiza/:id')
  update(@Param('id') id: number, @Body() updateMesaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(id, updateMesaDto);
  }

  @Delete('deletar/:id')
  remove(@Param('id') id: number) {
    return this.categoriaService.delete(id);
  }
}

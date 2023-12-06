import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComandaMesaService } from './comanda-mesa.service';
import { CreateComandaMesaDto } from './dto/create-comanda-mesa.dto';
import { UpdateComandaMesaDto } from './dto/update-comanda-mesa.dto';

@Controller('comandaMesa')
export class ComandaMesaController {
  constructor(private readonly comandaMesaService: ComandaMesaService) { }

  @Post()
  create(@Body() createComandaMesaDto: CreateComandaMesaDto) {
    return this.comandaMesaService.create(createComandaMesaDto);
  }

  @Get()
  findAll() {
    return this.comandaMesaService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.comandaMesaService.findOne(id);
  }
  @Get('mesa/:id')
  findAtivo(@Param('id') id: number) {
    return this.comandaMesaService.findAtivo(id, true);
  }

  @Patch('atualiza/:id')
  update(@Param('id') id: number, @Body() updateComandaMesaDto: UpdateComandaMesaDto) {
    return this.comandaMesaService.update(id, updateComandaMesaDto);
  }

  @Patch('finalizar/:idComanda')
  fecharMesa(@Param('idComanda') idComanda: number) {
    return this.comandaMesaService.fecharMesa(idComanda);
  }

  @Delete('deletar/:id')
  remove(@Param('id') id: number) {
    return this.comandaMesaService.delete(id);
  }
}

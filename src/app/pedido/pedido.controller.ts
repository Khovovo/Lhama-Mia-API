import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto[]) {
    return this.pedidoService.create(createPedidoDto);
  }
  

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }
  @Get('comanda/:id')
  findPedidoMesa(@Param('id') id: number) {
    return this.pedidoService.findPedidoMesa(id);
  }
  @Get('pagemento/:id')
  findPedidoMesaPagamento(@Param('id') id: number) {
    return this.pedidoService.findPedidoMesaPagamento(id);
  }
  @Get('geral/:andamento')
  findPedidosGerais(@Param('andamento') andamento: string) {
    return this.pedidoService.findGeral(andamento);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    
    return this.pedidoService.findOne(id);
  }

  @Patch('atualiza/:id')
  update(@Param('id') id: number, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(id, updatePedidoDto);
  }
  @Patch('cancela/:id')
  cancelaPedido(@Param('id') id: number) {
    return this.pedidoService.cancelaPedido(id);
  }
  @Patch('atualizaAndamento/:id/:descricao')
  updateStatus(@Param('id') id: number, @Param('descricao') andamento:string) {
    return this.pedidoService.updateStatus(id, andamento);
  }

  @Delete('deletar/:id')
  remove(@Param('id') id: number) {
    return this.pedidoService.delete(id);
  }
}

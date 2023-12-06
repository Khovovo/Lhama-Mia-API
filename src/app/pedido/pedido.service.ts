import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto[]) {
    return await this.prisma.pedido.createMany({
      data: createPedidoDto
    });
  }

  async findAll() {
    return await this.prisma.pedido.findMany({});
  }
  async findPedidoMesa(idComanda:number) {
    return await this.prisma.pedido.findMany({
      where: {
        idComanda,
      },
      include:{
      item:{
        select:{nomeItem: true}
      }, 
      colaborador:{
        select:{NOME:true}
      }
      }
        
    });
  }

  async findPedidoMesaPagamento(idComanda:number) {
    return await this.prisma.pedido.findMany({
      where: {
        idComanda,
        status: true,
      },
      include:{
      item:{
        select:{nomeItem: true, preco: true}
      }, 
      colaborador:{
        select:{NOME:true}
      }
      }
        
    });
  }

  async findGeral(andamento:string) {
    return await this.prisma.pedido.findMany({
      where: {
        andamento,
        status: true,
      },
      include:{
      item:{
        select:{nomeItem: true}
      }
      }
        
    });
  }

  async findOne(idPedido: number) {
    return await this.prisma.pedido.findUnique({
      where: {
        idPedido,
      }
    });
  }

  async update(idPedido: number, updatePedidoDto: UpdatePedidoDto) {
    return await this.prisma.pedido.update({
      data: updatePedidoDto,
      where: {
        idPedido, 
      }
    });
  }

  async cancelaPedido(idPedido: number) {
    return await this.prisma.pedido.update({
      data: {status:false},
      where: {
        idPedido, 
      }
    });
  }


  async updateStatus(idPedido: number, andamento: string) {
    return await this.prisma.pedido.update({
      
      where: {
        idPedido, 
      },
      data: {andamento}
    });
  }

  async delete(idPedido: number) {
    return await this.prisma.pedido.delete({
      where: {
        idPedido,
      }
    });
  }
}

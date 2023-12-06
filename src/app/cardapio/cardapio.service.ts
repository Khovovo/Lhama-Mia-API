import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardapioDto } from './dto/create-cardapio.dto';
import { UpdateCardapioDto } from './dto/update-cardapio.dto';

@Injectable()
export class CardapioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCardapioDto: CreateCardapioDto) {
    return await this.prisma.cardapio.createMany({
      data: createCardapioDto
    });
  }

  async findAll() {
    return await this.prisma.cardapio.findMany({});
  }

  async findOne(idItem: number) {
    return await this.prisma.cardapio.findUnique({
      where: {
        idItem,
      }
    });
  }

  async update(idItem: number, updateCardapioDto: UpdateCardapioDto) {
    return await this.prisma.cardapio.update({
      data: updateCardapioDto,
      where: {
        idItem, 
      }
    });
  }
  async updateStatus(idItem: number, status: boolean) {
    return await this.prisma.cardapio.update({
      data: { statusItem : status},
      where: {
        idItem, 
      }
    });
  }

  async delete(idItem: number) {
    return await this.prisma.cardapio.delete({
      where: {
        idItem,
      }
    });
  }
}

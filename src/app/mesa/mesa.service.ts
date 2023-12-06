import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Injectable()
export class MesaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMesaDto: CreateMesaDto) {
    return await this.prisma.mesa.createMany({
      data: createMesaDto
    });
  }

  async findAll() {
    return await this.prisma.mesa.findMany({});
  }

  async findOne(idMesa: number) {
    return await this.prisma.mesa.findUnique({
      where: {
        idMesa,
      }
    });
  }

  async update(idMesa: number, updateMesaDto: UpdateMesaDto) {
    return await this.prisma.mesa.update({
      data: updateMesaDto,
      where: {
        idMesa, 
      }
    });
  }

  async delete(idMesa: number) {
    return await this.prisma.mesa.delete({
      where: {
        idMesa,
      }
    });
  }
}

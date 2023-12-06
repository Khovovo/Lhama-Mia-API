import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComandaMesaDto } from './dto/create-comanda-mesa.dto';
import { UpdateComandaMesaDto } from './dto/update-comanda-mesa.dto';

@Injectable()
export class ComandaMesaService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createComandaMesaDto: CreateComandaMesaDto) {
    return await this.prisma.comandaMesa.createMany({
      data: createComandaMesaDto
    });
  }

  async findAll() {
    return await this.prisma.comandaMesa.findMany({});
  }

  async findOne(idComanda: number) {
    return await this.prisma.comandaMesa.findUnique({
      where: {
        idComanda,
      }
    });
  }
  async findAtivo(idMesa: number, status: boolean) {
    return await this.prisma.comandaMesa.findMany({
      where: {
        idMesa,
        status,
      }
    });
  }

  async fecharMesa(idComanda) {
    return await this.prisma.comandaMesa.update({
      where: {
        idComanda,
      },
      data: { status: false },
    });
  }

  async update(idComanda: number, updateMesaDto: UpdateComandaMesaDto) {
    return await this.prisma.comandaMesa.update({
      data: updateMesaDto,
      where: {
        idComanda,
      }
    });
  }

  async delete(idComanda: number) {
    return await this.prisma.comandaMesa.delete({
      where: {
        idComanda,
      }
    });
  }
}

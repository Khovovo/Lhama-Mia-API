import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    return await this.prisma.categoria.createMany({
      data: createCategoriaDto
    });
  }

  async findAll() {
    return await this.prisma.categoria.findMany({});
  }

  async findOne(idCategoria: number) {
    return await this.prisma.categoria.findUnique({
      where: {
        idCategoria,
      }
    });
  }

  async update(idCategoria: number, updateCategoriaDto: UpdateCategoriaDto) {
    return await this.prisma.categoria.update({
      data: updateCategoriaDto,
      where: {
        idCategoria, 
      }
    });
  }

  async delete(idCategoria: number) {
    return await this.prisma.categoria.delete({
      where: {
        idCategoria,
      }
    });
  }
}

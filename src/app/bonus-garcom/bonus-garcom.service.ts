import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBonusGarcomDto } from './dto/create-bonus-garcom.dto';
import { UpdateBonusGarcomDto } from './dto/update-bonus-garcom.dto';

@Injectable()
export class BonusGarcomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBonusGarcomDto: CreateBonusGarcomDto[]) {
    return await this.prisma.bonusGarcom.createMany({
      data: createBonusGarcomDto
    });
  }

  async findAll() {
    return await this.prisma.bonusGarcom.findMany({});
  }

  async findOne(idBonus: number) {
    return await this.prisma.bonusGarcom.findUnique({
      where: {
        idBonus,
      }
    });
  }
  async findGeral() {
    return await this.prisma.bonusGarcom.findMany({
      include:{
      pedido:{
        include:{
         colaborador:{
          select:{
            IDCOL: true,
            NOME: true
          }
         },
         item:{

         }
        },
      }
      }
    });
  }

  async findGeralPorData(dataInicial: string, dataFinal: string) {
    return await this.prisma.bonusGarcom.findMany({
      where:{
        diaReferencia:{
          lte: new Date(dataInicial) ,
          gte: new Date(dataFinal)
        }
      },
      include:{
      pedido:{
        include:{
         colaborador:{
          select:{
            IDCOL: true,
            NOME: true
          }
         },
         item:{

         }
        },
      }
      }
    });
  }

  async update(idBonus: number, updateBonusGarcomDto: UpdateBonusGarcomDto) {
    return await this.prisma.bonusGarcom.update({
      data: updateBonusGarcomDto,
      where: {
        idBonus, 
      }
    });
  }

  async delete(idBonus: number) {
    return await this.prisma.bonusGarcom.delete({
      where: {
        idBonus,
      }
    });
  }
}

import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MesaController],
  providers: [MesaService, PrismaService]
})
export class MesaModule {}

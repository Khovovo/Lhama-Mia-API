import { Module } from '@nestjs/common';
import { ComandaMesaService } from './comanda-mesa.service';
import { ComandaMesaController } from './comanda-mesa.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ComandaMesaController],
  providers: [ComandaMesaService, PrismaService]
})
export class ComandaMesaModule {}

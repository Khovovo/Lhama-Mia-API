import { Module } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { CardapioController } from './cardapio.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CardapioController],
  providers: [CardapioService, PrismaService]
})
export class CardapioModule {}

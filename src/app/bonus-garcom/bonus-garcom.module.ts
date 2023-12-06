import { Module } from '@nestjs/common';
import { BonusGarcomService } from './bonus-garcom.service';
import { BonusGarcomController } from './bonus-garcom.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BonusGarcomController],
  providers: [BonusGarcomService, PrismaService]
})
export class BonusGarcomModule {}

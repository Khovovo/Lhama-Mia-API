import { Module } from '@nestjs/common'
import { LoginsService } from './logins.service'
import { LoginsController } from './logins.controller'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [LoginsController],
  providers: [LoginsService, PrismaService],
})
export class LoginsModule {}

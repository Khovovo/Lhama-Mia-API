import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ColaboradoresModule } from './app/colaboradores/colaboradores.module'
import { LoginsModule } from './app/logins/logins.module'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { loggingMiddleware } from './common/middlewares/logging.middleware'
import configs from './common/configs/configs'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { GqlConfigService } from './gql-config.service'
import { AppResolver } from './app.resolver';
import { PedidoModule } from './app/pedido/pedido.module'
import { MesaModule } from './app/mesa/mesa.module'
import { ComandaMesaModule } from './app/comanda-mesa/comanda-mesa.module'
import { CategoriaModule } from './app/categoria/categoria.module'
import { CardapioModule } from './app/cardapio/cardapio.module'
import { BonusGarcomModule } from './app/bonus-garcom/bonus-garcom.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // Configurar seu middleware prisma
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    ColaboradoresModule,
    LoginsModule,
    PedidoModule,
    MesaModule,
    ComandaMesaModule,
    CategoriaModule,
    CardapioModule,
    BonusGarcomModule
    
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, PrismaService],
})
export class AppModule {}

import { json, urlencoded } from 'express'
import { ValidationPipe, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma'
import { AppModule } from './app.module'
import type { CorsConfig, NestConfig, SwaggerConfig } from 'src/common/configs/config.interface'
import { ConflictInterceptor } from './common/errors/interceptors/Conflict.interceptors'
import { DataBaseInterceptor } from './common/errors/interceptors/DataBase.interceptors'

const fs_1 = require('fs')

async function bootstrap() {
  //FIXME - 1 - Developer / 0 - Production
  const apitip = process.env.APITIP || '1'

  if (apitip === '1') {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const nestConfig = configService.get<NestConfig>('nest')
    const corsConfig = configService.get<CorsConfig>('cors')
    const swaggerConfig = configService.get<SwaggerConfig>('swagger')

    // Validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        forbidUnknownValues: true,
      })
    )

    // enable shutdown hook
    const prismaService: PrismaService = app.get(PrismaService)
    await prismaService.enableShutdownHooks(app)

    // Prisma Client Exception Filter for unhandled exceptions
    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ limit: '50mb', extended: true }))

    // Swagger Api
    if (swaggerConfig.enabled) {
      const options = new DocumentBuilder()
        .setTitle(swaggerConfig.title || 'Nestjs')
        .setDescription(swaggerConfig.description || 'The nestjs API description')
        .setVersion(swaggerConfig.version || '1.0')
        .build()
      const document = SwaggerModule.createDocument(app, options)

      SwaggerModule.setup(swaggerConfig.path || 'api', app, document)
    }

    // Cors
    if (corsConfig.enabled) {
      app.enableCors()
    }

    app.useGlobalInterceptors(new ConflictInterceptor())
    app.useGlobalInterceptors(new DataBaseInterceptor())

    await app.listen(process.env.PORT || nestConfig.port || 8389)
    Logger.log(`Servidor desenvolvimento rodando em http://localhost:${process.env.PORT || nestConfig.port || 8389}`, 'Bootstrap')
  } else {
    const app = await NestFactory.create(AppModule, {
      httpsOptions: {
      },
    })

    // Validation
    // Validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        forbidUnknownValues: true,
      })
    )

    // enable shutdown hook
    const prismaService: PrismaService = app.get(PrismaService)
    await prismaService.enableShutdownHooks(app)

    // Prisma Client Exception Filter for unhandled exceptions
    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

    const configService = app.get(ConfigService)
    const nestConfig = configService.get<NestConfig>('nest')
    const corsConfig = configService.get<CorsConfig>('cors')
    const swaggerConfig = configService.get<SwaggerConfig>('swagger')

    // Swagger Api
    if (swaggerConfig.enabled) {
      const options = new DocumentBuilder()
        .setTitle(swaggerConfig.title || 'Nestjs')
        .setDescription(swaggerConfig.description || 'The nestjs API description')
        .setVersion(swaggerConfig.version || '1.0')
        .build()
      const document = SwaggerModule.createDocument(app, options)

      SwaggerModule.setup(swaggerConfig.path || 'api', app, document)
    }

    // Cors
    if (corsConfig.enabled) {
      app.enableCors()
    }

    app.useGlobalInterceptors(new ConflictInterceptor())
    app.useGlobalInterceptors(new DataBaseInterceptor())

    await app.listen(process.env.PORT || nestConfig.port || 8389)
    Logger.log(`Servidor produção rodando em https://localhost:${process.env.PORT || nestConfig.port || 8389}`, 'Bootstrap')
  }
}
bootstrap()

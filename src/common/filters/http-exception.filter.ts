import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { response, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const exceptionRes = exception.getResponse()

    const err = typeof response === 'string' ? { message: exceptionRes } : (exceptionRes as object)

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
    })
  }
}

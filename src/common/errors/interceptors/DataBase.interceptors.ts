import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { DataBaseError } from '../types/DataBaseError'
import { HandleDatabaseErrorsUtils } from '../utils/handle-database-errors-utils'
import { isPrismaError } from '../utils/is-prisma-error.util'

@Injectable()
export class DataBaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) {
          error = HandleDatabaseErrorsUtils(error)
        }
        if (error instanceof DataBaseError) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        } else {
          throw error
        }
      })
    )
  }
}

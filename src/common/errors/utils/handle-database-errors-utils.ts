import { DataBaseError } from '../types/DataBaseError'
import { PrismaClientError } from '../types/PrismaClientError'
import { UniqueConstraintError } from '../types/UniqueConstraintError'

enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

export const HandleDatabaseErrorsUtils = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e)

    default:
      return new DataBaseError(e.message)
  }
}

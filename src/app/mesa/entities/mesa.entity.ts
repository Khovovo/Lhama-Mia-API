import { Mesa } from '@prisma/client'

export class Mesas implements Mesa {
  idMesa: number
  numeroMesa: number
  status: boolean

}

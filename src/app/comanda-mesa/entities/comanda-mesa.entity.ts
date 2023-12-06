import { ComandaMesa } from '@prisma/client'

export class comandaMesas implements ComandaMesa {
  idMesa: number
  idComanda: number
  status: boolean
  observacoes: string

}

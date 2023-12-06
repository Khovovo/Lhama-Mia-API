import { BonusGarcom } from '@prisma/client'

export class BonusGarcons implements BonusGarcom {
  idBonus: number
  diaReferencia: Date 
  porcentagem: number
  idPedido: number
  valor: number

}

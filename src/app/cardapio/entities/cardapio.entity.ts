import { Cardapio } from '@prisma/client'

export class Cardapios implements Cardapio {
  
  idItem:number
  categoria:number
  statusItem: boolean
  nomeItem: string
  preco: number 
  descricao: string
  descricaoStatus: string

}

import { Pedido } from '@prisma/client'

export class Pedidos implements Pedido {
    idPedido: number
    quantidade: number
    status: boolean
    Colaborador: number
    andamento: string
    idComanda: number
    dataPedido: Date
    idItem: number
}

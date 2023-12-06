import { Categoria } from '@prisma/client'

export class Categorias implements Categoria {
  idCategoria: number
  descricao: string

}

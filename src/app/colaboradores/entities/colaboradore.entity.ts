import { Colaboradores } from '@prisma/client'

export class ColaboradoresEntity implements Colaboradores {
  IDCOL: number
  NOME: string
  EMAIL: string
  SENHA: string
  ACESSOSISTEMA: boolean
  CHEFIA: boolean
  STATUS: boolean
}

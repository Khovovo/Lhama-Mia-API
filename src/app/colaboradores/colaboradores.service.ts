import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common'
// import { PrismaService } from 'src/prisma/prisma.service'
import { PrismaService } from 'nestjs-prisma'
import { CreateColaboradoreDto } from './dto/create-colaboradore.dto'
import { UpdateColaboradoreDto } from './dto/update-colaboradore.dto'
import { hash } from 'bcryptjs'

import * as nodemailer from 'nodemailer'
var CryptoJS = require('crypto-js')

@Injectable()
export class ColaboradoresService {
  public senhaUsuario: string
  public nomeUsuario: string
  public primeiroAcesso: boolean

  constructor (private readonly prisma: PrismaService) {}

  async create (createColaboradoreDto: CreateColaboradoreDto) {
    try {
      const { EMAIL } = createColaboradoreDto

      const emailExiste = this.prisma.colaboradores.findFirst({
        where: {
          EMAIL: EMAIL,
        },
      })

      if (!emailExiste) {
        throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT)
      }

      // //Descrypta a senha que chegou do front
      // const bytes = CryptoJS.AES.decrypt(createColaboradoreDto.SENHA, 'secret key 123')
      // const originalText = bytes.toString(CryptoJS.enc.Utf8)

      const primeiroAcesso = false
      // compare as senhas
      const senhaHash = await hash("12345678", 8)

      /**
       * Guarda a senha original do colaborador novo para usar no metodo "sendEmailNovasenha"
       */
      
      this.senhaUsuario = await createColaboradoreDto.SENHA
      this.nomeUsuario = await createColaboradoreDto.NOME

      const colaboradores = await this.prisma.colaboradores.create({
        data: {
          NOME: createColaboradoreDto.NOME,
          SENHA: senhaHash,
          EMAIL: createColaboradoreDto.EMAIL,
          ACESSOSISTEMA: createColaboradoreDto.ACESSOSISTEMA,
          CHEFIA: createColaboradoreDto.CHEFIA,
          STATUS: createColaboradoreDto.STATUS,
        },
        select: {
          NOME: true,
          EMAIL: true,
          ACESSOSISTEMA: true,
          CHEFIA: true,
          STATUS: true,
        },
      })
      return colaboradores
    } catch (err) {
      throw new HttpException(
        'Ocorreu um erro ao cadastrar colaborador. Erro: ' + err.message,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  //ANCHOR Gera uma nova senha aleatória
  async geraSenhaAleatoria() {
    let novasenha = Math.random().toString(36).slice(-10)

    for (let index = 0; index < novasenha.length; index++) {
      //Trecho para adicionar ao menos uma letra maiúscula
      if (novasenha[index].match(/[a-z]/i)) {
        novasenha = novasenha.charAt(index).toUpperCase() + novasenha.substring(index + 1)
        break
      }
    }
    return novasenha
  }

  //ANCHOR Salva a nova senha
  async updateNovaSenha(IDCOL: number, novaSenha: string) {
    if (novaSenha === '') {
      throw new HttpException('Nova senha não foi informada', HttpStatus.UNAUTHORIZED)
    }

    const usuarios = await this.prisma.colaboradores.findUnique({
      where: { IDCOL },
    })

    if (!usuarios) {
      throw new HttpException('Login não cadastrado!', HttpStatus.UNAUTHORIZED)
    }

    const senhaHash = await hash(novaSenha, 8)

    return await this.prisma.colaboradores.update({
      where: { IDCOL },
      data: {
        SENHA: senhaHash,
      },
      select: {
        IDCOL: true,
        EMAIL: true,
      },
    })
  }


  /**
   * @returns Encontra todos os colaboradores
   */
  async findAll () {
    let resultado: any[] = []
    let resJson: {}
    const colaboradores = await this.prisma.colaboradores.findMany({})

    for await (const col of colaboradores) {
      if (col.NOME != null) {
        resJson = {
          IDCOL: col.IDCOL,
          NOME: col.NOME,
          EMAIL: col.EMAIL,
          SENHA: col.SENHA,
          ACESSOSISTEMA: col.ACESSOSISTEMA,
          CHEFIA: col.CHEFIA,
          STATUS: col.STATUS,
        }
      } else {
        resJson = {
          IDCOL: col.IDCOL,
          NOME: col.NOME,
          EMAIL: col.EMAIL,
          SUPERVISOR: null,
          SUPERVISORNOME: null,
          SENHA: col.SENHA,
          ACESSOSISTEMA: col.ACESSOSISTEMA,
          CHEFIA: col.CHEFIA,
          STATUS: col.STATUS,
        }
      }
      resultado.push(resJson)
    }

    return resultado
  }

  async findOne (IDCOL: number) {
    let resultado: any[] = []
    let resJson: {}
    const colaboradores = await this.prisma.colaboradores.findUnique({
      where: { IDCOL },
    })

    resultado.push(resJson)

    return resultado
  }

  async update (IDCOL: number, updateColaboradoreDto: UpdateColaboradoreDto) {
    //Descrypta a senha que chegou do front
    const bytes = CryptoJS.AES.decrypt(
      updateColaboradoreDto.SENHA,
      'secret key 123',
    )
    const originalText = bytes.toString(CryptoJS.enc.Utf8)

    // compare as senhas
    const senhaHash = await hash(originalText, 8)

    const colaboradores = await this.prisma.colaboradores.update({
      where: {
        IDCOL,
      },
      data: {
        NOME: updateColaboradoreDto.NOME,
        SENHA: senhaHash,
        EMAIL: updateColaboradoreDto.EMAIL,
        ACESSOSISTEMA: updateColaboradoreDto.ACESSOSISTEMA,
        CHEFIA: updateColaboradoreDto.CHEFIA,
        STATUS: updateColaboradoreDto.STATUS,
      },
      select: {
        NOME: true,
        EMAIL: true,
        ACESSOSISTEMA: true,
        CHEFIA: true,
        STATUS: true,
      },
    })

    return colaboradores
  }

  async updateStatus (IDCOL: number, status: boolean) {
    const colaboradores = await this.prisma.colaboradores.update({
      data: {
        STATUS: status,
      },
      where: {
        IDCOL,
      },
    })

    return colaboradores
  }

  async updateChefia (IDCOL: number, chefia: boolean) {
    const colaboradores = await this.prisma.colaboradores.update({
      data: {
        CHEFIA: chefia,
      },
      where: {
        IDCOL,
      },
    })

    return colaboradores
  }

  async updateAcesso (IDCOL: number, acesso: boolean) {
    const colaboradores = await this.prisma.colaboradores.update({
      data: {
        ACESSOSISTEMA: acesso,
      },
      where: {
        IDCOL,
      },
    })

    return colaboradores
  }


  async upColaborador (
    IDCOL: number,
    updateColaboradoreDto: UpdateColaboradoreDto,
  ) {
    const colaboradores = await this.prisma.colaboradores.update({
      where: {
        IDCOL,
      },
      data: {
        NOME: updateColaboradoreDto.NOME,
        EMAIL: updateColaboradoreDto.EMAIL,
      },
      select: {
        NOME: true,
        EMAIL: true,
      },
    })
    this.senhaUsuario = await updateColaboradoreDto.SENHA
    this.nomeUsuario = await updateColaboradoreDto.NOME
    return colaboradores
  }

}

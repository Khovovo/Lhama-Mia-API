import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { compare, hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'

const nodemailer = require("nodemailer");
const jsonweb = require("jsonwebtoken");

@Injectable()
export class LoginsService {
  constructor(private readonly prisma: PrismaService) { }
  //ANCHOR Realiza o login
  async findByLogin(email: string, senha: string) {
    try {
      const user = await this.prisma.colaboradores.findFirst({
        select: {
          IDCOL: true,
          NOME: true,
          EMAIL: true,
          SENHA: true,
          CHEFIA: true,
          ACESSOSISTEMA: true,
          STATUS: true
        },
        where: { EMAIL: email },
      })

      console.log(senha)
      if (user.STATUS === false) {
        throw new HttpException('Colaborador se encontra inativo', HttpStatus.NOT_ACCEPTABLE)
      }

      if (!user) {
        throw new HttpException('Credenciais inválidas: Email', HttpStatus.NOT_ACCEPTABLE)
      }

      //Descrypta a senha que chegou do front
      // const bytes = await CryptoJS.AES.decrypt(senha, 'secret key 123')
      // const originalText = await bytes.toString(CryptoJS.enc.Utf8)

      // compare as senhas
      const senhaIgual = await compare(senha, user.SENHA)

      if (!senhaIgual) {
        throw new HttpException('Credenciais inválidas: Senha', HttpStatus.NOT_ACCEPTABLE)
      }

      const jwt_token = process.env.JWT_TOKEN || 'b99a56d3a122a96aa4688fafa994756c'

      //Gera um token JwT e Devolver os dados do usuário logado.
      const token = jsonweb.sign(
        {
          nome: user.NOME,
          email: user.EMAIL,
          chefia: user.CHEFIA,
          acesso: user.ACESSOSISTEMA
        },
        jwt_token,
        {
          subject: user.IDCOL.toString(),
          expiresIn: '30d',
        }
      )

      return {
        token: token,
      }
    } catch (error) {
      throw new HttpException('Erro login: ' + error.message, HttpStatus.NOT_ACCEPTABLE)
    }
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

    //Descrypta a senha que chegou do front
    //const bytes = CryptoJS.AES.decrypt(novaSenha, 'secret key 123')
    //const originalText = bytes.toString(CryptoJS.enc.Utf8)
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



  

  //ANCHOR Redefinil senha
  async AlterarSenha(EMAIL: string, SenhaAtual: string, NovaSenha: string) {
    const usuarioAtual = await this.prisma.colaboradores.findFirst({
      where: { EMAIL },
    })

    if (!usuarioAtual) {
      throw new HttpException('Não foi encontrado nenhum usuário com o email informado!', HttpStatus.BAD_REQUEST)
    }

    //Compara a senha atual
    const senhaIgual = await compare(SenhaAtual, usuarioAtual.SENHA)

    if (!senhaIgual) {
      throw new HttpException('Senha Atual não confere com a senha passada!', HttpStatus.BAD_REQUEST)
    }

    //Descrypta a senha que chegou do front
    //const bytes = CryptoJS.AES.decrypt(NovaSenha, 'secret key 123')
    //const originalText = bytes.toString(CryptoJS.enc.Utf8)
    const senhaHash = await hash(NovaSenha, 8)

    return await this.prisma.colaboradores.update({
      where: {
        IDCOL: usuarioAtual.IDCOL,
      },
      data: {
        SENHA: senhaHash
      },
      select: {
        IDCOL: true,
        NOME: true,
        EMAIL: true,
      },
    })
  }

  
}

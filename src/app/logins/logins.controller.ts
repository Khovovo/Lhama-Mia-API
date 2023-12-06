import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CreateLoginDto } from './dto/create-login.dto'
import { LoginsService } from './logins.service'

@Controller('logins')
export class LoginsController {
  constructor(private readonly loginsService: LoginsService) { }

  @Post()
  public login(@Body() loginUserDto: CreateLoginDto) {
    return this.loginsService.findByLogin(loginUserDto.email, loginUserDto.senha)
  }


  @Patch('alterarSenha/:email/:senhaatual/:novasenha')
  AlterarSenha(
    @Param('email') email: string,
    @Param('senhaatual') senhaatual: string,
    @Param('novasenha') novasenha: string
  ) {
    return this.loginsService.AlterarSenha(email, senhaatual, novasenha)
  }
}

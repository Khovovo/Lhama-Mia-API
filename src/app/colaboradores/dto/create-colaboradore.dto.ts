import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateColaboradoreDto {
  @IsString()
  @IsNotEmpty()
  NOME: string

  @IsEmail()
  @IsNotEmpty()
  EMAIL: string

  @IsString()
  @IsNotEmpty()
  SENHA: string

  @IsBoolean()
  @IsOptional()
  ACESSOSISTEMA: boolean

  @IsBoolean()
  @IsOptional()
  CHEFIA: boolean

  @IsBoolean()
  @IsOptional()
  STATUS: boolean

}
